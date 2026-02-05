import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import List "mo:core/List";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProductId = Nat32;
  type CategoryId = Nat32;

  var nextProductId : Nat32 = 0;
  var nextCategoryId : Nat32 = 0;
  var nextOrderId : Nat32 = 0;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    available : Bool;
    categoryId : ?CategoryId;
  };

  let products = Map.empty<ProductId, Product>();

  type OrderId = Nat32;

  public type Order = {
    id : OrderId;
    items : [OrderItem];
    totalAmount : Float;
    timestamp : Time.Time;
    customerName : Text;
    customerEmail : Text;
    customerAddress : Text;
  };

  public type OrderItem = {
    productId : ProductId;
    quantity : Nat32;
    price : Float;
  };

  let orders = Map.empty<OrderId, Order>();

  public type Category = {
    id : CategoryId;
    name : Text;
  };

  let categories = Map.empty<CategoryId, Category>();

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management (Admin-only for CUD operations)
  public shared ({ caller }) func createProduct(name : Text, description : Text, price : Float, imageUrl : Text, available : Bool, categoryId : ?CategoryId) : async ProductId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    let newProductId = nextProductId;
    nextProductId += 1;

    let product : Product = {
      id = newProductId;
      name;
      description;
      price;
      imageUrl;
      available;
      categoryId;
    };

    products.add(newProductId, product);
    newProductId;
  };

  public shared ({ caller }) func updateProduct(productId : ProductId, name : Text, description : Text, price : Float, imageUrl : Text, available : Bool, categoryId : ?CategoryId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?_) {
        let updatedProduct : Product = {
          id = productId;
          name;
          description;
          price;
          imageUrl;
          available;
          categoryId;
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?_) {
        products.remove(productId);
      };
    };
  };

  public query func getProductById(productId : ProductId) : async ?Product {
    products.get(productId);
  };

  public query func listAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func listProductsByCategory(categoryId : CategoryId) : async [Product] {
    products.values().toArray().filter(func(product) {
      switch (product.categoryId) {
        case (?catId) { catId == categoryId };
        case (null) { false };
      };
    });
  };

  public query func listAllProductsSortedByPrice() : async [Product] {
    products.values().toArray().sort(
      func(a, b) {
        if (a.price < b.price) { #less }
        else if (a.price > b.price) { #greater }
        else { #equal };
      }
    );
  };

  // Category Management (Admin-only for CUD operations)
  public shared ({ caller }) func createCategory(name : Text) : async CategoryId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };

    let newCategoryId = nextCategoryId;
    nextCategoryId += 1;

    let category : Category = {
      id = newCategoryId;
      name;
    };

    categories.add(newCategoryId, category);
    newCategoryId;
  };

  public shared ({ caller }) func updateCategory(categoryId : CategoryId, name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };

    switch (categories.get(categoryId)) {
      case (null) {
        Runtime.trap("Category not found");
      };
      case (?_) {
        let updatedCategory : Category = {
          id = categoryId;
          name;
        };
        categories.add(categoryId, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func deleteCategory(categoryId : CategoryId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete categories");
    };

    switch (categories.get(categoryId)) {
      case (null) {
        Runtime.trap("Category not found");
      };
      case (?_) {
        categories.remove(categoryId);
      };
    };
  };

  // Public category browsing (no auth required)
  public query func listAllCategories() : async [Category] {
    categories.values().toArray();
  };

  // Order Management
  public shared func createOrder(items : [OrderItem], totalAmount : Float, customerName : Text, customerEmail : Text, customerAddress : Text) : async OrderId {
    // Public function - guests can place orders
    if (items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };

    let newOrderId = nextOrderId;
    nextOrderId += 1;

    let order : Order = {
      id = newOrderId;
      items;
      totalAmount;
      timestamp = Time.now();
      customerName;
      customerEmail;
      customerAddress;
    };

    orders.add(newOrderId, order);
    newOrderId;
  };

  public query ({ caller }) func getOrderById(orderId : OrderId) : async ?Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.get(orderId);
  };

  public query ({ caller }) func listAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray();
  };

  // Public product catalog browsing (no auth required)
  public query func getProductCatalog() : async { categories : [Category]; products : [Product] } {
    let categoriesArray = categories.values().toArray();
    let productsArray = products.values().toArray();
    { categories = categoriesArray; products = productsArray };
  };
};

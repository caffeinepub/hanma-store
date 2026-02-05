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
  var nextProductId : Nat32 = 0;
  var nextCategoryId : Nat32 = 0;
  var nextOrderId : Nat32 = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ProductId = Nat32;
  type CategoryId = Nat32;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    available : Bool;
    categoryId : ?CategoryId;
  };

  public type Category = {
    id : CategoryId;
    name : Text;
  };

  public type OrderItem = {
    productId : ProductId;
    quantity : Nat32;
    price : Float;
  };

  public type Order = {
    id : Nat32;
    items : [OrderItem];
    totalAmount : Float;
    timestamp : Time.Time;
    customerName : Text;
    customerEmail : Text;
    customerAddress : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let products = Map.empty<ProductId, Product>();
  let categories = Map.empty<CategoryId, Category>();
  let orders = Map.empty<Nat32, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();

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

  public shared ({ caller }) func createProduct(
    name : Text,
    description : Text,
    price : Float,
    imageUrl : Text,
    available : Bool,
    categoryId : ?CategoryId,
  ) : async ProductId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      imageUrl;
      available;
      categoryId;
    };

    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(
    productId : ProductId,
    name : Text,
    description : Text,
    price : Float,
    imageUrl : Text,
    available : Bool,
    categoryId : ?CategoryId,
  ) : async () {
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
    products.values().toArray().filter(
      func(product) {
        switch (product.categoryId) {
          case (?catId) { catId == categoryId };
          case (null) { false };
        };
      }
    );
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

  public shared ({ caller }) func createCategory(name : Text) : async CategoryId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };

    let category : Category = {
      id = nextCategoryId;
      name;
    };

    categories.add(nextCategoryId, category);
    nextCategoryId += 1;
    category.id;
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

  public query func listAllCategories() : async [Category] {
    categories.values().toArray();
  };

  public shared func createOrder(
    items : [OrderItem],
    totalAmount : Float,
    customerName : Text,
    customerEmail : Text,
    customerAddress : Text,
  ) : async Nat32 {
    if (items.size() == 0) {
      Runtime.trap("Order must contain at least one item");
    };

    let order : Order = {
      id = nextOrderId;
      items;
      totalAmount;
      timestamp = Time.now();
      customerName;
      customerEmail;
      customerAddress;
    };

    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query ({ caller }) func getOrderById(orderId : Nat32) : async ?Order {
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

  public query func getProductCatalog() : async {
    categories : [Category];
    products : [Product];
  } {
    let categoriesArray = categories.values().toArray();
    let productsArray = products.values().toArray();
    { categories = categoriesArray; products = productsArray };
  };

  public shared ({ caller }) func adminSeedInitialProducts() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };

    if (products.size() == 0) {
      let productA : Product = {
        id = nextProductId;
        name = "Test Product A";
        description = "This is a dummy product";
        price = 49.23;
        imageUrl = "https://immutableproductimageslink.com/a";
        available = true;
        categoryId = null;
      };

      let productB : Product = {
        id = nextProductId + 1;
        name = "Test Product B";
        description = "This is a second dummy product";
        price = 231.09;
        imageUrl = "https://immutableproductimageslink.com/b";
        available = true;
        categoryId = null;
      };

      products.add(productA.id, productA);
      products.add(productB.id, productB);
      nextProductId += 2;
    };
  };
};

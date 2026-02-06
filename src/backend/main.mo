import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  var nextProductId : Nat32 = 1_000_000;
  var nextCategoryId : Nat32 = 1_000_000;
  var nextOrderId : Nat32 = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Nat32, SwitchProduct>();
  let categories = Map.empty<Nat32, SwitchCategory>();
  let orders = Map.empty<Nat32, Order>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var googleReviewConfig : ?GoogleReviewConfig = ?{
    apiKey = "";
    placeId = "";
    fallbackRating = "4.5+ rating on Google with hundreds of happy customers.";
  };

  let menu = List.empty<MenuCategory>();

  public type MenuItem = {
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    available : Bool;
  };

  public type MenuCategory = {
    name : Text;
    items : [MenuItem];
  };

  public type SwitchProduct = {
    id : Nat32;
    name : Text;
    description : Text;
    price : Float;
    imageUrl : Text;
    available : Bool;
    categoryId : ?Nat32;
  };

  public type SwitchCategory = {
    id : Nat32;
    name : Text;
  };

  public type OrderItem = {
    productId : Nat32;
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

  public type GoogleReviewConfig = {
    apiKey : Text;
    placeId : Text;
    fallbackRating : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  public type ProductCategoryResponse = {
    categories : [SwitchCategory];
    products : [SwitchProduct];
  };

  // User profile functionality
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
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

  // Menu functionality
  public shared ({ caller }) func adminSeedMenuItems() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed menu items");
    };

    let menuItemData : [(Text, Text, Text, Float, Bool)] = [
      ("Lightswitch Installation", "Professional installation of new lightswitches for your home or business.", "https://via.placeholder.com/200x200.png?text=Lightswitch+Installation", 99.99, true),
      ("Lightswitch Replacement", "Safe and efficient replacement of old or faulty lightswitches.", "https://via.placeholder.com/200x200.png?text=Lightswitch+Replacement", 89.99, true),
      ("Dimmer Switch Installation", "Upgrade your lighting with modern dimmer switches.", "https://via.placeholder.com/200x200.png?text=Dimmer+Switch+Installation", 129.99, true),
      ("Smart Switch Setup", "Integrate smart switches for remote control and automation.", "https://via.placeholder.com/200x200.png?text=Smart+Switch+Setup", 149.99, true),
      ("Multi-Way Switch Installation", "Professional installation of multi-way switches for convenience.", "https://via.placeholder.com/200x200.png?text=Multi-Way+Switch+Installation", 139.99, true),
      ("Designer Switches", "Stylish and high-quality designer switches for a sophisticated look.", "https://via.placeholder.com/200x200.png?text=Designer+Switches", 199.99, true),
      ("Switch Plates", "Custom switch plates in various styles and materials.", "https://via.placeholder.com/200x200.png?text=Switch+Plates", 29.99, true),
      ("Switch Safety Inspection", "Comprehensive inspection of all switches and electrical connections for safety and compliance.", "https://via.placeholder.com/200x200.png?text=Switch+Safety+Inspection", 69.99, true),
    ];

    let menuItems = menuItemData.map(
      func((name, description, imageUrl, price, available)) {
        {
          name;
          description;
          imageUrl;
          price;
          available;
        };
      }
    );

    let category = {
      name = "Switch Services";
      items = menuItems;
    };

    menu.clear();
    menu.add(category);
  };

  // Public query - accessible to all users including guests
  public query func getMenu() : async [MenuCategory] {
    menu.values().toArray();
  };

  // Switch product functionality
  public shared ({ caller }) func createSwitchProduct(
    name : Text,
    description : Text,
    price : Float,
    imageUrl : Text,
    available : Bool,
    categoryId : ?Nat32,
  ) : async Nat32 {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    let product : SwitchProduct = {
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

  public shared ({ caller }) func updateSwitchProduct(
    productId : Nat32,
    name : Text,
    description : Text,
    price : Float,
    imageUrl : Text,
    available : Bool,
    categoryId : ?Nat32,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(productId)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?_) {
        let updatedProduct : SwitchProduct = {
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

  public shared ({ caller }) func deleteSwitchProduct(productId : Nat32) : async () {
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

  // Switch category functionality
  public shared ({ caller }) func createSwitchCategory(name : Text) : async Nat32 {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create categories");
    };

    let category : SwitchCategory = {
      id = nextCategoryId;
      name;
    };

    categories.add(nextCategoryId, category);
    nextCategoryId += 1;
    category.id;
  };

  public shared ({ caller }) func updateSwitchCategory(categoryId : Nat32, name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update categories");
    };

    switch (categories.get(categoryId)) {
      case (null) {
        Runtime.trap("Category not found");
      };
      case (?_) {
        let updatedCategory : SwitchCategory = {
          id = categoryId;
          name;
        };
        categories.add(categoryId, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func deleteSwitchCategory(categoryId : Nat32) : async () {
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

  // Order functionality
  public shared ({ caller }) func createOrder(
    items : [OrderItem],
    totalAmount : Float,
    customerName : Text,
    customerEmail : Text,
    customerAddress : Text,
  ) : async Nat32 {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create orders");
    };

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

  public shared ({ caller }) func updateGoogleReviewConfig(apiKey : Text, placeId : Text, fallbackRating : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Only admin users can update Google review configuration");
    };
    googleReviewConfig := ?{
      apiKey;
      placeId;
      fallbackRating;
    };
  };

  public query ({ caller }) func getGoogleReviewConfig() : async ?GoogleReviewConfig {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Only admin users can fetch Google review configuration");
    };
    googleReviewConfig;
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public func fetchGoogleRating() : async {
    rating : ?Float;
    reviewCount : ?Nat;
    fallbackMessage : Text;
  } {
    switch (googleReviewConfig) {
      case (null) {
        {
          rating = null;
          reviewCount = null;
          fallbackMessage = "Rating not available";
        };
      };
      case (?config) {
        let url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" # config.placeId # "&fields=rating,user_ratings_total&key=" # config.apiKey;
        let result = await OutCall.httpGetRequest(url, [], transform);

        switch (result) {
          case (_) {
            {
              rating = null;
              reviewCount = null;
              fallbackMessage = config.fallbackRating;
            };
          };
        };
      };
    };
  };

  public query func getSwitchCatalog() : async ProductCategoryResponse {
    let categoriesArray = categories.values().toArray();
    let productsArray = products.values().toArray();
    { categories = categoriesArray; products = productsArray };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin users can view all orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getOrderById(orderId : Nat32) : async ?Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin users can view order details");
    };
    orders.get(orderId);
  };
};


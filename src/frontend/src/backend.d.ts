import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: CategoryId;
    name: string;
}
export type Time = bigint;
export interface OrderItem {
    productId: ProductId;
    quantity: number;
    price: number;
}
export type CategoryId = number;
export type ProductId = number;
export interface Order {
    id: number;
    customerName: string;
    customerAddress: string;
    totalAmount: number;
    timestamp: Time;
    items: Array<OrderItem>;
    customerEmail: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: ProductId;
    categoryId?: CategoryId;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    price: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminSeedTestProducts(): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCategory(name: string): Promise<CategoryId>;
    createOrder(items: Array<OrderItem>, totalAmount: number, customerName: string, customerEmail: string, customerAddress: string): Promise<number>;
    createProduct(name: string, description: string, price: number, imageUrl: string, available: boolean, categoryId: CategoryId | null): Promise<ProductId>;
    deleteCategory(categoryId: CategoryId): Promise<void>;
    deleteProduct(productId: ProductId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderById(orderId: number): Promise<Order | null>;
    getProductById(productId: ProductId): Promise<Product | null>;
    getProductCatalog(): Promise<{
        categories: Array<Category>;
        products: Array<Product>;
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllCategories(): Promise<Array<Category>>;
    listAllOrders(): Promise<Array<Order>>;
    listAllProducts(): Promise<Array<Product>>;
    listAllProductsSortedByPrice(): Promise<Array<Product>>;
    listProductsByCategory(categoryId: CategoryId): Promise<Array<Product>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCategory(categoryId: CategoryId, name: string): Promise<void>;
    updateProduct(productId: ProductId, name: string, description: string, price: number, imageUrl: string, available: boolean, categoryId: CategoryId | null): Promise<void>;
}

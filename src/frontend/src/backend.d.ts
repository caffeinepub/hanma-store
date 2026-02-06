import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GoogleReviewConfig {
    fallbackRating: string;
    placeId: string;
    apiKey: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface MenuCategory {
    name: string;
    items: Array<MenuItem>;
}
export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}
export interface ProductCategoryResponse {
    categories: Array<SwitchCategory>;
    products: Array<SwitchProduct>;
}
export interface Order {
    id: number;
    customerName: string;
    customerAddress: string;
    totalAmount: number;
    timestamp: Time;
    items: Array<OrderItem>;
    customerEmail: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface MenuItem {
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    price: number;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface SwitchProduct {
    id: number;
    categoryId?: number;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    price: number;
}
export interface SwitchCategory {
    id: number;
    name: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    adminSeedMenuItems(): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createOrder(items: Array<OrderItem>, totalAmount: number, customerName: string, customerEmail: string, customerAddress: string): Promise<number>;
    createSwitchCategory(name: string): Promise<number>;
    createSwitchProduct(name: string, description: string, price: number, imageUrl: string, available: boolean, categoryId: number | null): Promise<number>;
    deleteSwitchCategory(categoryId: number): Promise<void>;
    deleteSwitchProduct(productId: number): Promise<void>;
    fetchGoogleRating(): Promise<{
        fallbackMessage: string;
        rating?: number;
        reviewCount?: bigint;
    }>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getGoogleReviewConfig(): Promise<GoogleReviewConfig | null>;
    getMenu(): Promise<Array<MenuCategory>>;
    getOrderById(orderId: number): Promise<Order | null>;
    getSwitchCatalog(): Promise<ProductCategoryResponse>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateGoogleReviewConfig(apiKey: string, placeId: string, fallbackRating: string): Promise<void>;
    updateSwitchCategory(categoryId: number, name: string): Promise<void>;
    updateSwitchProduct(productId: number, name: string, description: string, price: number, imageUrl: string, available: boolean, categoryId: number | null): Promise<void>;
}

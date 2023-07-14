export interface User {
    userId: number,
    firstName: string,
    lastName?: string,
    email: string,
    mobile: string,
    password: string
}

export interface Address {
    addressId: number,
    address1: string,
    address2: string,
    address3: string,
    city: string,
    state: string,
    country: string,
    zipCode: string,
    user?: User,
    saveAddress?: boolean
}


export interface ProductCategory {
    productcategoryId: number,
    categoryName: string,
    products: []
}

export interface Product {
    productId: number,
    productCode: string,
    productName: string,
    brand: string,
    mfgDate: string,
    expDate: string,
    seller: string,
    discription: string,
    price: number,
    images?: Image[],
    productCategory: ProductCategory
}

export interface Response {
    isError: boolean,
    message: string,
    response: any;
}

export interface Cart {
    cartId: number,
    noOfItems: number,
    totalCartPrice: number
}

export interface OrderItem {
    orderItemId: number,
    quantity: number,
    totalPrice: number,
    product: Product
}

export interface cartResponse {
    cart: Cart,
    orderItems: OrderItem[]
}

export interface Payment {
    paymentId: number,
    paymentType: number,
    paymentStatus: number,
    remark: string
}

export interface PurchaseOrder {
    purchaseOrderId: number,
    orderDate: Date,
    user: User,
    cart: Cart,
    address: Address,
    payment: Payment
}

export interface PurchaseOrderRequest {
    address: Address,
    payment: Payment
}

export interface PurchaseOrderResponse {
    order: PurchaseOrder,
    orderItems: OrderItem[]
}

export interface Image {
    imageId: number,
    image_url: string,
    product: Product
}

export enum PaymentType{
    CreditCard,
    CashOnDelivery
}

export enum PaymentStatus{
    Pending,
    Authorized,
    Captured,
    AuthorizationFailed,
    CaptureFailed,
}
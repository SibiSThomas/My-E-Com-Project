import { Data } from "@angular/router";

export class MyOrder {
    myOrderId: number;
    orderDate: Date;
    status: string;
    cartId: number;
    sellerId: number;
    buyerId: number;
    productId: number;
    productName: string;
    productPrice: number;
    productColor: string;
    orderedQuantity: number;
    productDescription: string;
    productImage:File;
}

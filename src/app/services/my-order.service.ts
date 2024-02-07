import { Injectable } from '@angular/core';
import { Cart } from '../dataType/cart';
import { MyOrder } from '../dataType/my-order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyOrderService {

  constructor(private httpClient: HttpClient) { }

  createMyOrder(cart: Cart):MyOrder{
    let myOrder: MyOrder = {
      myOrderId: undefined,
      orderDate: new Date(),
      status: 'pending',
      cartId: cart.cartId,
      sellerId: cart.sellerId,
      buyerId: cart.buyerId,
      productId: cart.productId,
      productName: cart.productName,
      productPrice: cart.productPrice,
      productColor: cart.productColor,
      orderedQuantity: cart.orderedQuantity,
      productDescription: cart.productDescription,
      productImage: cart.productImage
    }
    return myOrder;
  }

  saveOrder(myOrder: MyOrder){
    return this.httpClient.post("http://localhost:8080/myOrder/add",myOrder)
  }

  findByBuyerId(buyerId: number){
    return this.httpClient.get<MyOrder[]>(`http://localhost:8080/myOrder/findByBuyerId?buyerId=${buyerId}`);
  }

  deleteOrder(orderId: number){
    return this.httpClient.delete(`http://localhost:8080/myOrder/delete?orderId=${orderId}`);
  }
}

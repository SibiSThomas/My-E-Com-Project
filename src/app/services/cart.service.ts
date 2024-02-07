import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../dataType/product';
import { Cart } from '../dataType/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartDataEmitter = new EventEmitter<Cart[]>();

  constructor(private httpClient: HttpClient) { }

  createCart(product: Product, qty: number): Cart {
    let cart: Cart = {
      cartId: undefined,
      sellerId: product.sellerId,
      buyerId: undefined,
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      productColor: product.productColor,
      orderedQuantity: qty,
      productDescription: product.productDescription,
      productImage: product.productImage
    }
    return cart;
  }
  addToLocalCart(cart: Cart) {
    let cartData: Cart[] = [];
    let localStore = localStorage.getItem('localCart');
    if(localStore){
      cartData = JSON.parse(localStore);
      cartData.push(cart);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartDataEmitter.emit(cartData);
    }else{
      cartData.push(cart);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartDataEmitter.emit(cartData);
    }
  }
  addToDBCart(cart: Cart){
    return this.httpClient.post("http://localhost:8080/cart/add",cart);
  }
  findByBuyerId(buyerId: number){
    return this.httpClient.get<Cart[]>(`http://localhost:8080/cart/findByBuyerId/${buyerId}`);
  }
  findByBuyerIdAndProductId(buyerId: number, productId: number){
    return this.httpClient.get<Cart>(`http://localhost:8080/cart/findByBuyerIdAndProductId?buyerId=${buyerId}&productId=${productId}`);
  }

  removeFromDBCart(cartId: number){
    return this.httpClient.delete(`http://localhost:8080/cart/delete/${cartId}`);
  }

  moveFromLocalToDBCart(){
    let cartData: Cart[] = [];
    let sessionStore = sessionStorage.getItem('buyer');
    let buyerId: number;
    if(sessionStore){
      buyerId = JSON.parse(sessionStore).buyerId;
    }
    let localStore = localStorage.getItem('localCart');
    if(localStore){
      cartData = JSON.parse(localStore);
      cartData.forEach(item=>{
        item.buyerId = buyerId;
        this.addToDBCart(item).subscribe(res=>{
          this.findByBuyerId(buyerId).subscribe(res=>{
            this.cartDataEmitter.emit(res);
          });
        });
      });
      localStorage.removeItem('localCart');
    }
    
  }
}

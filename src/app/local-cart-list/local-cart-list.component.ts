import { Component } from '@angular/core';
import { Cart } from '../dataType/cart';
import { faShoppingBasket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-local-cart-list',
  templateUrl: './local-cart-list.component.html',
  styleUrls: ['./local-cart-list.component.css']
})
export class LocalCartListComponent {
  grossTotal: number = 0;
  taxableAmount = 0;
  tax: number = .18;
  discount: number = .1;
  delivery: number = 50;
  netAmount: number = 0;
  checkout: boolean;
  cartData: Cart[] = [];
  iconCart = faTrash;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    let localStore = localStorage.getItem('localCart');
    if (localStore) {
      this.cartData = JSON.parse(localStore);
    }
    for (let i = 0; i < this.cartData.length; i++) {
      this.grossTotal = this.grossTotal + (this.cartData[i].productPrice * this.cartData[i].orderedQuantity);
    }
    this.discount = Math.round(this.grossTotal * this.discount);
    this.taxableAmount = Math.round(this.grossTotal - this.discount);
    this.tax = Math.round(this.taxableAmount * this.tax);
    this.netAmount = Math.round(this.grossTotal + this.tax - this.discount + this.delivery);
    if(this.grossTotal===0){
      this.delivery = 0;
      this.netAmount = 0;
      this.checkout = true;
    }

  }
  removeFromLocalCart(cart: Cart) {
    let localStore = localStorage.getItem('localCart');
    if (localStore) {
      this.cartData = JSON.parse(localStore);
    }
    this.cartData = this.cartData.filter(item => item.productId !== cart.productId);
    localStorage.setItem('localCart', JSON.stringify(this.cartData));
    this.cartService.cartDataEmitter.emit(this.cartData);
    if(!this.cartData.length){
      localStorage.removeItem('localCart');
    }
    this.grossTotal = 0;
    this.tax= .18;
    this.discount = .1;
    this.delivery = 50;
    this.netAmount = 0;
    for (let i = 0; i < this.cartData.length; i++) {
      this.grossTotal = this.grossTotal + (this.cartData[i].productPrice * this.cartData[i].orderedQuantity);
    }
    this.discount = Math.round(this.grossTotal * this.discount);
    this.taxableAmount = Math.round(this.grossTotal - this.discount);
    this.tax = Math.round(this.taxableAmount * this.tax);
    this.netAmount = Math.round(this.grossTotal + this.tax - this.discount + this.delivery);
    if(!this.grossTotal){
      this.delivery = 0;
      this.netAmount = 0;
      this.checkout = true;
    }

  }


}

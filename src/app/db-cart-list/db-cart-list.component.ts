import { Component } from '@angular/core';
import { Cart } from '../dataType/cart';
import { CartService } from '../services/cart.service';
import { Buyer } from '../dataType/buyer';

@Component({
  selector: 'app-db-cart-list',
  templateUrl: './db-cart-list.component.html',
  styleUrls: ['./db-cart-list.component.css']
})
export class DbCartListComponent {
  grossTotal: number = 0;
  taxableAmount: number = 0;
  tax: number = .18;
  discount: number = .1;
  delivery: number = 50;
  netAmount: number = 0;
  checkout: boolean;
  cartData: Cart[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    let sessionStore = sessionStorage.getItem('buyer');
    if (sessionStore) {
      let buyer: Buyer = JSON.parse(sessionStore);
      this.cartService.findByBuyerId(buyer.buyerId).subscribe(res => {
        this.cartData = res;
        for (let i = 0; i < this.cartData.length; i++) {
          this.grossTotal = this.grossTotal + (this.cartData[i].productPrice * this.cartData[i].orderedQuantity);
        }
        this.discount = Math.round(this.grossTotal * this.discount);
        this.taxableAmount = Math.round(this.grossTotal - this.discount);
        this.tax = Math.round(this.taxableAmount * this.tax);
        this.netAmount = Math.round(this.grossTotal + this.tax - this.discount + this.delivery);
        if(this.grossTotal ===0){
          this.delivery = 0;
          this.netAmount = 0;
          this.checkout = true;
        }
      });
    }

  }
  removeFromDBCart(cart: Cart) {
    this.cartService.removeFromDBCart(cart.cartId).subscribe(res => {
      this.cartService.findByBuyerId(cart.buyerId).subscribe(res => {
        this.cartData = res;
        this.cartService.cartDataEmitter.emit(this.cartData);
        this.grossTotal=0;
        this.tax=.18;
        this.discount=.1;
        this.netAmount=0;

        for(let i=0; i<this.cartData.length; i++){
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
      });
    });



  }
}

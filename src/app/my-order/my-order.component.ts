import { Component } from '@angular/core';
import { MyOrder } from '../dataType/my-order';
import { MyOrderService } from '../services/my-order.service';
import { Buyer } from '../dataType/buyer';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orderList: MyOrder[];
  buyerId: number;
  constructor(private myOrderService: MyOrderService,
    private productService: ProductService,
    private router: Router){}

  ngOnInit(){
    let sessionStore = sessionStorage.getItem('buyer');
    if(sessionStore){
      this.buyerId = JSON.parse(sessionStore).buyerId;
      this.myOrderService.findByBuyerId(this.buyerId).subscribe(res=>{
        this.orderList = res;
      });
    }
  }
  deleteOrder(order: MyOrder) {
    this.myOrderService.deleteOrder(order.myOrderId).subscribe(res=>{
      this.productService.addQty(order.productId, order.orderedQuantity).subscribe();
      this.myOrderService.findByBuyerId(this.buyerId).subscribe(res=>{
        this.orderList = res;
        if(this.orderList.length===0){
          alert("There is no item in the orders list");
          this.router.navigateByUrl("");
        }
      });
    });
  }

}

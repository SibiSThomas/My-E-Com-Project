import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Buyer } from '../dataType/buyer';
import { CartService } from '../services/cart.service';
import { MyOrder } from '../dataType/my-order';
import { MyOrderService } from '../services/my-order.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {

  
  buyer: Buyer;

  buyerAddress: string;
  buyerEmail: string;
  buyerMobile: string;
  netAmount: string | number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private myOrderService: MyOrderService,
    private productServie: ProductService){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(res=>{
      this.netAmount = res.get('netAmount');
    });
    let sessionStore = sessionStorage.getItem('buyer');
    if(sessionStore){
      this.buyer = JSON.parse(sessionStore);
      this.buyerAddress = this.buyer.buyerAddress;
      this.buyerEmail = this.buyer.buyerEmail;
      this.buyerMobile = this.buyer.buyerMobile;
    }
  }

  confirm() {
    this.router.navigateByUrl("confirmation/"+this.netAmount);
    this.cartService.findByBuyerId(this.buyer.buyerId).subscribe(res=>{
      res.forEach(item=>{
        let myOrder = this.myOrderService.createMyOrder(item);
        this.myOrderService.saveOrder(myOrder).subscribe(res=>{
          this.productServie.subtractQty(myOrder.productId, myOrder.orderedQuantity).subscribe(res=>{
            this.cartService.removeFromDBCart(myOrder.cartId).subscribe(res=>{
              this.cartService.cartDataEmitter.emit([]);
            });
          });
        });
      });
      
    });
  }

}

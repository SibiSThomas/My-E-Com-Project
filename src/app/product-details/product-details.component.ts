import { Component } from '@angular/core';
import { Product } from '../dataType/product';
import { Buyer } from '../dataType/buyer';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../dataType/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productId: number;
  product: Product;
  qty: number = 1;
  quantityLeft: number;
  removeCart: boolean;
  buyer: Buyer;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router){}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(res=>{
      this.productId = Number(res.get('productId'));
      this.productService.findProductById(this.productId).subscribe(res=>{
        this.product = res;
        this.quantityLeft = res.productQuantity;
        let localStore = localStorage.getItem('localCart');
        if(localStore){
          let cart: Cart[] = JSON.parse(localStore);
          cart.forEach(item=>{
            if(item.productId === this.productId){
              this.removeCart = true;
            }
          }); 
        }
      });   
    });
    let sessionStore = sessionStorage.getItem('buyer');
    if(sessionStore){
      this.buyer = JSON.parse(sessionStore);
      this.cartService.findByBuyerIdAndProductId(this.buyer.buyerId, this.productId).subscribe(res=>{
        if(res){
          this.removeCart = true;
        }
      });
    }
  }
  removeFromCart() {
    //remove form localcart
    let sessionStore = sessionStorage.getItem('buyer');
    if(!sessionStore){
      let localStore = localStorage.getItem('localCart');
      if(localStore){
        let localCartData:Cart[] = JSON.parse(localStore);
        for(let i = 0; i<localCartData.length; i++){
          if(localCartData[i].productId === this.productId){
            this.quantityLeft = this.quantityLeft + localCartData[i].orderedQuantity;
          }
        }     
        localCartData = localCartData.filter(item=>item.productId!== this.productId);
        localStorage.setItem('localCart', JSON.stringify(localCartData));
        this.removeCart = false;
        this.cartService.cartDataEmitter.emit(localCartData);
        if(localCartData.length===0){
          localStorage.removeItem('localCart');
        }
      }
    }else{
      //remove from dbCart
      //get the product from the db cart

      this.cartService.findByBuyerIdAndProductId(this.buyer.buyerId, this.productId).subscribe(obj=>{
        this.cartService.removeFromDBCart(obj.cartId).subscribe(res=>{
          this.quantityLeft = this.quantityLeft + obj.orderedQuantity;
          this.removeCart = false;
          this.cartService.findByBuyerId(this.buyer.buyerId).subscribe(res=>{
            this.cartService.cartDataEmitter.emit(res);
          });
        });
      });


    }

  }
  addToCart() {
    
    this.quantityLeft = this.quantityLeft - this.qty;
    /*There ar two steps to addToCart  1.  addToDBCart and 2. addToLocalCart*/
    //create a cart object
    
    let buyerSession = sessionStorage.getItem('buyer');
    if(buyerSession){
      let buyerId = JSON.parse(buyerSession).buyerId;
      let cartData = this.cartService.createCart(this.product, this.qty);
      cartData.buyerId = buyerId;
      //call addToDBCart method
      this.cartService.addToDBCart(cartData).subscribe((res: Cart)=>{     
        this.cartService.findByBuyerId(res.buyerId).subscribe(res=>{          
          this.cartService.cartDataEmitter.emit(res);
          this.removeCart = true;
        });
      });

    }else{
      let cartData = this.cartService.createCart(this.product, this.qty);
      //call addToLocalCart method
      this.cartService.addToLocalCart(cartData);
      this.removeCart = true;
    }
  }
  buyNow() {
    let sessionStore = sessionStorage.getItem('buyer');
    let localStore = localStorage.getItem('localCart');
    if(sessionStore){
      this.addToCart();
      this.router.navigateByUrl("db-cart-list");
    }else{
      if(localStore){
        this.router.navigateByUrl("buyer-login");
      }else{
        this.addToCart();
        this.router.navigateByUrl("buyer-login");
      }
    }
    
    
  }
  addQty() {
    if(this.qty<this.quantityLeft){
      this.qty = this.qty+1;
    }
  }
  subtractQty() {
    if(this.qty>1){
      this.qty = this.qty-1;
    }
  }
}

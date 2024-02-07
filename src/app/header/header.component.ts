import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleHeader: string = 'default';
  iconCart = faCartShopping;
  sellerName: string;
  buyerName: string;
  cartCount:number=0;
 

  constructor(private router: Router,
    private cartService: CartService) { }

  ngOnInit() {
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        let sellerSession = sessionStorage.getItem('seller');
        let buyerSession = sessionStorage.getItem('buyer');
        if(sellerSession && res.url.includes('seller')){
          this.toggleHeader = 'seller';
          this.sellerName = JSON.parse(sellerSession).sellerName;
        }else if(buyerSession && res.url.includes('')){ 
          this.toggleHeader = 'buyer';
          this.buyerName = JSON.parse(buyerSession).buyerName;
          this.cartService.cartDataEmitter.subscribe(res=>{
            this.cartCount = res.length;
          });
        }else{
          this.toggleHeader = 'default';
          this.cartService.cartDataEmitter.subscribe(res=>{
            this.cartCount = res.length;
          });
        }
        //local cart count to be available all the time
        let localStore = localStorage.getItem('localCart');
        if(localStore){
          let localCart = JSON.parse(localStore);
          this.cartCount = localCart.length;
        }
        //db cart to be available when buyer is in
        let sessionStore = sessionStorage.getItem('buyer');
        if(sessionStore){
          let buyerId = JSON.parse(sessionStore).buyerId;
          this.cartService.findByBuyerId(buyerId).subscribe(res=>{
            this.cartCount = res.length;
          });
        }
      }
    });
  }
  logOutBuyer() {
    sessionStorage.removeItem('buyer');
    this.toggleHeader = 'default';
    this.router.navigateByUrl("");
    this.cartService.cartDataEmitter.emit([]);
  }
  logoutSeller() {
    sessionStorage.removeItem('seller');
    this.toggleHeader = 'default';
    this.router.navigateByUrl("");
  }
}

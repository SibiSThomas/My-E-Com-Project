import { Component } from '@angular/core';
import { Product } from '../dataType/product';
import { ProductService } from '../services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products : Product[];
  iconCart = faCartShopping;
  reverseProducts: Product[]=[];


  constructor(private productService: ProductService){}

  ngOnInit(){
    this.productService.findAll().subscribe(res=>{
      this.products = res;

      for(let i=this.products.length-1, j=0; i>=0; i--, j++){
        this.reverseProducts[j] = this.products[i];
      }
    });
    
  }
}

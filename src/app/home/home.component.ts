import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Product } from '../dataType/product';
import { ProductService } from '../services/product.service';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[];
  searchedProducts: Product[];
  iconCart = faCartShopping;
  reverseProducts: Product[] = [];
  searchItem: string;

  @ViewChild('closeList') closeList: ElementRef;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2) { 
      
      this.renderer.listen('window', 'click',(e:Event)=>{
        if(e.target != this.closeList?.nativeElement){
          this.searchedProducts = undefined;
        }
     });
    }

  ngOnInit() {
    this.productService.findAll().subscribe(res => {
      this.products = res;
      for (let i = this.products.length - 1, j = 0; i >= 0; i--, j++) {
        this.reverseProducts[j] = this.products[i];
      }
    });

  }
  clearSearchBox() {
    this.searchItem = undefined;
   
  }
  searchOnKeyup(event: KeyboardEvent) {
    this.searchItem = (event.target as HTMLInputElement).value;
    this.searchedProducts = this.products.filter(item => item.productName.toLowerCase().includes(this.searchItem.toLowerCase()));
    if(this.searchedProducts.length>5){
      this.searchedProducts.length = 5;
    }
  }

  showSearchedProducts() {
    this.router.navigateByUrl("");
  }
  showProduct(productId: number) {
    this.router.navigateByUrl("product-details/"+productId);
  }
}

import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../dataType/product';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  iconTrash = faTrash;
  iconEdit = faEdit;
  productList: Product[];
  sellerId: number;
  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    let sellerSession = sessionStorage.getItem('seller');
    this.sellerId = JSON.parse(sellerSession).sellerId;
    this.productService.findBySellerId(this.sellerId).subscribe(res => {
      this.productList = res;
    });
  }
  deleteProduct(productId: number) {
    let x:boolean = confirm("Do you really want to delete this product? OK to delete");
    if(x){
      this.productService.deleteProduct(productId).subscribe(res=>{
        this.productService.findBySellerId(this.sellerId).subscribe(res => {
          this.productList = res;
        });
      });
    }
  }

  openEditForm(productId: number) {
   this.router.navigateByUrl(`/seller-editProduct/${productId}`);
  }
}

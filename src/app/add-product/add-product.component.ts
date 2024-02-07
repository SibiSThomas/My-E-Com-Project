import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../dataType/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {



  addProductForm: FormGroup;

  sellerId: FormControl;
  productName: FormControl;
  productPrice: FormControl;
  productColor: FormControl;
  productQuantity: FormControl;
  productDescription: FormControl;
  productImage: FormControl;

  selectedFile: File;

  constructor(private productService: ProductService,
    private router: Router){}

  ngOnInit(){
    let sellerSession = sessionStorage.getItem('seller');
    this.sellerId = JSON.parse(sellerSession).sellerId;
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.productName = new FormControl('', [Validators.required]);
    this.productPrice = new FormControl('', [Validators.required]);
    this.productColor = new FormControl('', [Validators.required]);
    this.productQuantity = new FormControl('', [Validators.required]);
    this.productDescription = new FormControl('', [Validators.required]);
    this.productImage = new FormControl('', [Validators.required]);
  }

  createForm(){
    
    this.addProductForm = new FormGroup({
      productName: this.productName,
      productPrice: this.productPrice,
      productColor: this.productColor,
      productQuantity: this.productQuantity,
      productDescription: this.productDescription,
      productImage: this.productImage,
      sellerId: new FormControl({
        value: this.sellerId,
        disabled: true
      })
    })
  }
 
  onFileSelection(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
  }

  addProduct() {
    let formData = new FormData();
    formData.append('sellerId', JSON.stringify(this.sellerId));
    formData.append('productName', this.productName.value);
    formData.append('productPrice', this.productPrice.value);
    formData.append('productColor', this.productColor.value);
    formData.append('productQuantity', this.productQuantity.value);
    formData.append('productDescription', this.productDescription.value);
    formData.append('file', this.selectedFile);
    
    this.productService.addProduct(formData).subscribe((res:Product)=>{
      this.router.navigateByUrl("/seller-home");   
    });
    
  }
  cancel() {
    this.router.navigateByUrl("/seller-home")  
  }    

}

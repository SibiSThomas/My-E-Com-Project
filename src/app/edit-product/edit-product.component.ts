import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../dataType/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  
  
  editProductForm: FormGroup;
  productId:number;
  sellerId: FormControl;
  productName: FormControl;
  productPrice: FormControl;
  productColor: FormControl;
  productQuantity: FormControl;
  productDescription: FormControl;
  productImage: FormControl;
  selectedFile: File;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router){}

  createFormControls(){
    this.productName = new FormControl('', [Validators.required]);
    this.productPrice = new FormControl('', [Validators.required]);
    this.productColor = new FormControl('', [Validators.required]);
    this.productQuantity = new FormControl('', [Validators.required]);
    this.productDescription = new FormControl('', [Validators.required]);
    this.productImage = new FormControl('', [Validators.required]);
  }

  createForm(){
    this.editProductForm = new FormGroup({
      productName : this.productName,
      productPrice : this.productPrice,
      productColor : this.productColor,
      productQuantity : this.productQuantity,
      productDescription : this.productDescription,
      productImage : this.productImage,
      sellerId : new FormControl({
        value: this.sellerId,
        disabled: true
      })
    })
  }

  ngOnInit(){
    let sellerSession = sessionStorage.getItem('seller');
    this.sellerId = JSON.parse(sellerSession).sellerId;
    this.activatedRoute.paramMap.subscribe(res=>{
      this.productId = Number(res.get('productId'));
      this.productService.findProductById(this.productId).subscribe(res=>{
        this.editProductForm.patchValue(res);  
      });
    });
    this.createFormControls();
    this.createForm();    
  }
  onFileSelection(event: Event) {
    this.selectedFile = (event.target as HTMLInputElement).files[0];
  }

  editProduct() {
    let formData = new FormData();
    formData.append('productId', JSON.stringify(this.productId));
    formData.append('sellerId', JSON.stringify(this.sellerId));
    formData.append('productName', this.productName.value);
    formData.append('productPrice', this.productPrice.value);
    formData.append('productColor', this.productColor.value);
    formData.append('productQuantity', this.productQuantity.value);
    formData.append('productDescription', this.productDescription.value);
    formData.append('file', this.selectedFile);
    this.productService.updateProduct(formData).subscribe(res=>{
      this.router.navigateByUrl("/seller-home");
    });
  }
  

}

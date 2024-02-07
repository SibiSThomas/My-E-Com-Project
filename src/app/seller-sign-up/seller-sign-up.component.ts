import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seller } from '../dataType/seller';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-sign-up',
  templateUrl: './seller-sign-up.component.html',
  styleUrls: ['./seller-sign-up.component.css']
})
export class SellerSignUpComponent {

  sellerForm: FormGroup;
  sellerName: FormControl;
  sellerEmail: FormControl;
  sellerMobile: FormControl;
  sellerPassword: FormControl;
  
  existingSeller: string;

  constructor(private router: Router,
              private sellerService: SellerService){}

  createFormControls(){
    this.sellerName = new FormControl("", [Validators.required]);
    this.sellerEmail = new FormControl("", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.sellerMobile = new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
    this.sellerPassword = new FormControl("", [Validators.required]);
  }

  createForm(){
    this.sellerForm = new FormGroup({
      sellerName: this.sellerName,
      sellerPassword: this.sellerPassword,
      sellerEmail: this.sellerEmail,
      sellerMobile: this.sellerMobile
    });
  }

  ngOnInit(){
    this.createFormControls();
    this.createForm();
  }
  sellerSignUp() {
    this.sellerService.addSeller(this.sellerForm.value).subscribe((res: Seller)=>{
      if(res){
        sessionStorage.setItem('seller', JSON.stringify(res));
        this.router.navigateByUrl("/seller-home");
      }else{
        this.existingSeller = "**Existing Seller...";
      }
    });
  }
}

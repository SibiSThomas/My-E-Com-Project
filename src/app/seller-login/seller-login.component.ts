import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Seller } from '../dataType/seller';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent {
    
  loginForm: FormGroup;
  sellerEmail: FormControl;
  sellerPassword: FormControl;

  invalidCredentials: string;

  constructor(private router: Router,
    private sellerService: SellerService){}

  createFormControl(){
    this.sellerEmail = new FormControl("",[Validators.required]);
    this.sellerPassword = new FormControl("", [Validators.required]);
  }

  createForm(){
    this.loginForm = new FormGroup({
      sellerEmail: this.sellerEmail,
      sellerPassword: this.sellerPassword
    });
  }

  ngOnInit(){
    this.createFormControl();
    this.createForm();
  }
  sellerLogin(){
    let formData = new FormData();
    formData.append('sellerEmail', this.sellerEmail.value);
    formData.append('sellerPassword', this.sellerPassword.value);
    this.sellerService.sellerLogin(formData).subscribe((res:Seller)=>{
      if(res){
        sessionStorage.setItem('seller', JSON.stringify(res));
        this.router.navigateByUrl("seller-home");
      }else{
        this.invalidCredentials = "**Invalid Credentials.....!";
      }
    });
  }
}

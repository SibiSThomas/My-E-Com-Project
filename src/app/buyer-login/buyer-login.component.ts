import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyerService } from '../services/buyer.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buyer-login',
  templateUrl: './buyer-login.component.html',
  styleUrls: ['./buyer-login.component.css']
})
export class BuyerLoginComponent {

  invalidCredentials: string;
  loginForm: FormGroup;
  buyerEmail: FormControl;
  buyerPassword: FormControl;

  constructor(private buyerService: BuyerService,
              private router: Router,
              private cartService: CartService) {

  }
  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }
  createFormControls() {
    this.buyerEmail = new FormControl('', [Validators.required]);
    this.buyerPassword = new FormControl('', [Validators.required]);
  }
  createForm() {
    this.loginForm = new FormGroup({
      buyerEmail: this.buyerEmail,
      buyerPassword: this.buyerPassword
    });
  }
  buyerLogin() {
    let formData = new FormData();
    formData.append('email', this.buyerEmail.value);
    formData.append('password', this.buyerPassword.value);
    this.buyerService.loginBuyer(formData).subscribe(res=>{
      if(res){
        sessionStorage.setItem('buyer',JSON.stringify(res));
        this.cartService.moveFromLocalToDBCart();
        this.router.navigateByUrl("");

      }else{
        this.invalidCredentials = "**Invalid Credentials...."
      }
    });
  }
}
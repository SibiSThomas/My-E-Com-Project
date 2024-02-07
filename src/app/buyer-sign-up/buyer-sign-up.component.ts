import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerService } from '../services/buyer.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-buyer-sign-up',
  templateUrl: './buyer-sign-up.component.html',
  styleUrls: ['./buyer-sign-up.component.css']
})
export class BuyerSignUpComponent {
  signUpForm: FormGroup;
  
  buyerName: FormControl;
  buyerPassword: FormControl;
  buyerEmail: FormControl;
  buyerAddress: FormControl;
  buyerMobile: FormControl;

  existingCustomer: string;
  constructor(private buyerService: BuyerService,
    private router: Router,
    private cartService: CartService){}

  createFormControls(){
    this.buyerName = new FormControl('', [Validators.required]);
    this.buyerPassword = new FormControl('', [Validators.required]);
    this.buyerEmail = new FormControl('', [Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    this.buyerAddress = new FormControl('', [Validators.required]);
    this.buyerMobile = new FormControl('', [Validators.required,
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
  }

  createForm(){
    this.signUpForm = new FormGroup({
      buyerName : this.buyerName,
      buyerPassword: this.buyerPassword,
      buyerEmail: this.buyerEmail,
      buyerAddress: this.buyerAddress,
      buyerMobile: this.buyerMobile
    });
  }

  ngOnInit(){
    this.createFormControls();
    this.createForm();
  }
  signUpCustomer(){
    this.buyerService.addBuyer(this.signUpForm.value).subscribe(res=>{
      if(res){
        sessionStorage.setItem('buyer', JSON.stringify(res));
        this.cartService.moveFromLocalToDBCart();
        this.router.navigateByUrl("");
      }else{
        this.existingCustomer = "**Existing Customer....";
      }
    });
    
  }
}

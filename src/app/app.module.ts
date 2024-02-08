import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerLoginComponent } from './buyer-login/buyer-login.component';
import { BuyerSignUpComponent } from './buyer-sign-up/buyer-sign-up.component';
import { HttpClientModule} from '@angular/common/http';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerSignUpComponent } from './seller-sign-up/seller-sign-up.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AddProductComponent } from './add-product/add-product.component';
import { Base64Pipe } from './base64.pipe';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LocalCartListComponent } from './local-cart-list/local-cart-list.component';
import { DbCartListComponent } from './db-cart-list/db-cart-list.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MyOrderComponent } from './my-order/my-order.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BuyerLoginComponent,
    BuyerSignUpComponent,
    SellerLoginComponent,
    SellerSignUpComponent,
    HomeComponent,
    SellerHomeComponent,
    AddProductComponent,
    Base64Pipe,
    EditProductComponent,
    ProductDetailsComponent,
    LocalCartListComponent,
    DbCartListComponent,
    PlaceOrderComponent,
    ConfirmationComponent,
    MyOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

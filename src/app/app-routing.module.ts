import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLoginComponent } from './buyer-login/buyer-login.component';
import { BuyerSignUpComponent } from './buyer-sign-up/buyer-sign-up.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerSignUpComponent } from './seller-sign-up/seller-sign-up.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerGuard } from './seller.guard';
import { BuyerGuard } from './buyer.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { LocalCartListComponent } from './local-cart-list/local-cart-list.component';
import { DbCartListComponent } from './db-cart-list/db-cart-list.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MyOrderComponent } from './my-order/my-order.component';


const routes: Routes = [
  {component: HomeComponent, path: ""},
  {component: BuyerLoginComponent, path:"buyer-login", canActivate:[BuyerGuard]},
  {component: BuyerSignUpComponent, path:"buyer-sign-up", canActivate:[BuyerGuard]},
  {component: SellerLoginComponent, path: "seller-login", canActivate:[SellerGuard]},
  {component: SellerSignUpComponent, path: "seller-sign-up", canActivate:[SellerGuard]},
  {component: SellerHomeComponent, path: "seller-home"},
  {component: AddProductComponent, path: "seller-addProduct"},
  {component: EditProductComponent, path: "seller-editProduct/:productId"},
  {component: ProductDetailsComponent, path: "product-details/:productId"},
  {component: LocalCartListComponent, path: "local-cart-list"},
  {component: DbCartListComponent, path: "db-cart-list"},
  {component: PlaceOrderComponent, path: "place-order/:netAmount"},
  {component: ConfirmationComponent, path: "confirmation/:netAmount"},
  {component: MyOrderComponent, path: "myOrder"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

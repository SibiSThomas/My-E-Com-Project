import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seller } from '../dataType/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private httpClient: HttpClient) { }

  addSeller(seller: Seller):Observable<Object>{
    return this.httpClient.post("http://localhost:8080/seller/addSeller",seller);
  }

  sellerLogin(formData: FormData): Observable<Object>{
    return this.httpClient.post("http://localhost:8080/seller/login",formData);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buyer } from '../dataType/buyer';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private httpClient: HttpClient) { }

  addBuyer(buyer: Buyer){
    return this.httpClient.post("http://localhost:8080/buyer/addBuyer",buyer);
  }
  loginBuyer(formData: FormData){
    return this.httpClient.post("http://localhost:8080/buyer/login",formData);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../dataType/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  addProduct(formData: FormData):Observable<Object>{
    return this.httpClient.post("http://localhost:8080/product/add",formData);
  }
  findBySellerId(sellerId: number){
    return this.httpClient.get<Product[]>(`http://localhost:8080/product/findBySellerId/${sellerId}`);
  }
  deleteProduct(productId: number){
    return this.httpClient.delete(`http://localhost:8080/product/deleteProduct/${productId}`);
  }
  findProductById(productId: number){
    return this.httpClient.get<Product>(`http://localhost:8080/product/findById/${productId}`)
  }
  updateProduct(formData: FormData){
    return this.httpClient.post("http://localhost:8080/product/updateProduct",formData);
  }
  findAll(){
    return this.httpClient.get<Product[]>("http://localhost:8080/product/findAll");
  }
  
  subtractQty(productId: number, qty: number){
    return this.httpClient.get(`http://localhost:8080/product/subtractQty?productId=${productId}&qty=${qty}`);
  }

  addQty(productId: number, qty: number){
    return this.httpClient.get(`http://localhost:8080/product/addQty?productId=${productId}&qty=${qty}`);
  }

}

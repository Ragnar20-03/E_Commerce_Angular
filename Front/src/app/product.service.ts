import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private hobj : HttpClient) { }

  getProducts()
  {
    return this.hobj.get("http://localhost:5100/api/products")
  }
  getProductsById(pid : any){
    return this.hobj.get(`http://localhost:5100/api/products/${pid}`)
  }
}

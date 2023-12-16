import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private hobj : HttpClient) { }

  getCart(pid : any)
  {
    return this.hobj.get(`http://localhost:5100/cart/getCart/${pid}`)
  }
}

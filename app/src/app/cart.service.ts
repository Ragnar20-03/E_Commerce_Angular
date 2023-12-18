import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public hobj : HttpClient) { }

  getCart(cid : any)
  {
    return this.hobj.get<any>(`http://localhost:5100/api/cart/${cid}`)

  }
  addToCart(pid :any , cid:any)
  {
    return this.hobj.post<any>(`http://localhost:5100/api/addCart/${cid}/${pid}` , {})
  }
  removeCart(pid : any , cid : any)
  { 
    return this.hobj.delete<any>(`http://localhost:5100/api/addCart/${cid}/${pid}`)

  }
}

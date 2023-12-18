import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public hobj : HttpClient) { }
  
  login(loginData : any)
  {
    return this.hobj.post<any>("http://localhost:5100/api/login" , loginData)
  }
  register(registerData : any)
  {
    return this.hobj.post<any>("http://localhost:5100/api/register" , registerData)

  }
}

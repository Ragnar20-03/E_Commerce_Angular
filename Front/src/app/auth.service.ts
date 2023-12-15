import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private hobj : HttpClient) { }

  register(registerData :any)
  {
    return this.hobj.post<any>("http://localhost:5100/api/register" , registerData)
  }

  login(loginData : any)
  {
    console.log(loginData);
    return this.hobj.post<any>("http://localhost:5100/api/login" , loginData)
    
  }
}

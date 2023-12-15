import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private aobj : AuthService , public fobj : FormBuilder){}
  
  loginForm = this.fobj.group({
    username : [''] , 
    password : ['']
  })
  
  onLogin()
  {
    this.aobj.login(this.loginForm.value).subscribe({
      next : res => {
        console.log("Response is from login data is :" ,res);
      } , 
      error : err => {
        console.log("Error  is from login data is :" ,err);

      }
    })
  }
}

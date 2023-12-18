import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginData = {
    username : "",
    password : "" , 
    email : ""
  }
  constructor(private aobj : AuthService , public router : Router)
  {

  }
  onLogin()
  {
    this.aobj.login(this.loginData).subscribe({
      next : res =>{
        console.log("Response from Login compomemt : " , res);
        alert(res.token)
        console.log((res.cid));
        localStorage.setItem('cid' , res.cidX)
        
        this.router.navigate(['/products'])
      } , 
      error : err => {
        console.log("Error from Login component" , err);
        alert(err.error) 
      }

    })
  }

}

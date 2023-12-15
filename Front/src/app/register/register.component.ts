import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(public fobj : FormBuilder , private aobj : AuthService)
  {

  }

  registrationForm = this.fobj.group({
    name : ['roshan'],
    lastname : ['patul'],
    phonenumber : [909090],
    email : ["roshanpp20@gmai;.com"],
    username : ['rp21'],
    password : ['ere'],
    confirmPassword : ['ere'],
    address : this.fobj.group({
      city:['Malegaon'],
      pincode:['423203'],
      dist:['Nashik'],
      addressline:['Satananaka'],
    })
  })

  onSubmit()
  {
    console.log(this.registrationForm.value);
    this.aobj.register(this.registrationForm.value).subscribe({
      next :res => {
         console.log("respomse is : " , res)
      },
      error : err =>  {
        console.log("Error is : ", err);
        
        this.registrationForm.reset()

      }
    })
    
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css'
})
export class MyFormComponent {


  constructor(private formBuilder : FormBuilder){}

  registrationFrom = new FormGroup({
    userName  : new FormControl('Roshan'),
    password : new FormControl(''),
    confirmPassword : new FormControl('')
  })

  loginForm = this.formBuilder.group({
    userName : ['Roshan'] , 
    password : [''],
    confirmPassword : [''],
    address : this.formBuilder.group({
      city:['malegaon' ] , 
      pin : [423203] , 
      Dist : ['Nashik']
    })
  })
onSubmit()
{
  console.log(this.loginForm.value);
  
}

}

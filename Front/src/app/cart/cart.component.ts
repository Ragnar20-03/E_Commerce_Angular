import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

    cartPid : any = []

    constructor(public cart : CartService , private hobj : HttpClient , public cobj : CookieService){}

    ngOnInit()  
    {
      this.cart.getCart(1).subscribe({
        next : res => {
          console.log("response is : " ,res);
          
          this.cartPid = res
          console.log(this.cartPid);
          
        }
        ,error : err => {
          console.log(err);
        }

      })

      let myC = this.cobj.get('myCookie')
        console.log(myC , " : : " );
    }

}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: any[] = [{}]
  products: any[] = [{}]
  constructor(public cobj: CartService, public pobj: ProductService) {

  }
  ngOnInit() {
    this.cobj.getCart(localStorage.getItem('cid')).subscribe({
      next: res => {
        console.log("res is : ", res);
        this.cart = res.cart;
        console.log("cart is : ", this.cart);

        this.cart.map((pid) => {
          console.log("cartmap", pid);

          this.pobj.getProductsById(pid).subscribe({
            next: res => {
              console.log("getProductByid , " , res);
              this.products.push(res)
            }
            ,
            error: err => {
              console.log(err);

            }
          })

        })
        console.log(this.products);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}

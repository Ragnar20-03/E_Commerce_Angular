import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products : any = [{}]
  constructor(public pobj : ProductService ,public  router: Router){}

    ngOnInit()
    {
      this.pobj.getProducts().subscribe({
        next : res => {
          console.log(res);
          this.products = res
        } , 
        error : err => {
          console.log("error occures in product.component.ts");
        }
      })
    }
    onView(pid : number)
    {
      this.router.navigate(['/products' , pid])
    }
}

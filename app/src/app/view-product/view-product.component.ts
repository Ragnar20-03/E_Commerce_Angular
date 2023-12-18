import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

productId:any ;
productDetail : any[] = [{}]
  constructor(public router : Router , public activeRouter : ActivatedRoute , public pobj : ProductService , public cart : CartService){}
  ngOnInit(): void {
      this.activeRouter.paramMap.subscribe((params : ParamMap) => {
        this.productId = params.get('pid')
      })

      this.pobj.getProductsById(this.productId).subscribe({
        next : res => {
            this.productDetail = res
        }
      })
  }

  onAddToCart(pid : any)
  {
    this.cart.addToCart(pid , localStorage.getItem('cid') ).subscribe({
      next : res => {
        console.log("OmAddtoCart Response : " , res);
      },
      error : err => {
        console.log("OmAddtoCart Error : " , err);
        
      }
    })
  }
}

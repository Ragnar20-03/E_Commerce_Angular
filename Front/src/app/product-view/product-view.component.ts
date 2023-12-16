import { Component, OnInit } from '@angular/core';
import { Router , ParamMap, ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  constructor(public robj:Router , public router : ActivatedRoute ,public pobj : ProductService){}

  productId : any ;
  productEvent : any = {  }
  
  ngOnInit()
  {
    let id : string | null
    this.router.paramMap.subscribe((params : ParamMap ) => {
      id = params.get('id')
      this.productId = id !== null && parseInt(id)

      this.pobj.getProductsById(this.productId).subscribe({
        next : res => {
          console.log(res);
          this.productEvent = res
        },
        error : err => {
          console.log(err);
          
        }
      })
    })
  }
  onAddCart(pid : any)
  {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { Router , ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{

  constructor(public robj:Router , public router : ActivatedRoute ){}

  productId : any ;

  ngOnInit()
  {
    let id : string | null
    this.router.paramMap.subscribe((params : ParamMap ) => {
      id = params.get('id')
      this.productId = id !== null && parseInt(id)
    })
  }
}

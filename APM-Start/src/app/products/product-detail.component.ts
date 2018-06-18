import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [],
})
export class ProductDetailComponent implements OnInit {

  pageTitle: string  = 'Product Detail';
  product: IProduct;
  id: number;


  constructor(private _route: ActivatedRoute, private _productService: ProductService, private _router: Router) { }

  ngOnInit(): void {
    this.id = +this._route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${this.id}`;
    this.product = this._productService.GetProductById(this.id);
    console.log(this.product);
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }
}

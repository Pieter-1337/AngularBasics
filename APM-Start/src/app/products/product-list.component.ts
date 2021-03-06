import {Component, OnInit, OnDestroy} from '@angular/core';
import {IProduct} from './product';
import { ProductService } from './product.service';



@Component({
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: []
})

export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string{
        return this._listFilter;
    }

    set listFilter(value: string){

        this._listFilter = value;
        this.FilteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    FilteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private _productService: ProductService) {
    }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
      this._productService.getProducts().subscribe(products => {
          this.products = products; this.FilteredProducts = this.products;
        },
        error => this.errorMessage = <any>error);
  }

  ngOnDestroy(): void {
      console.log('In onDestroy');
  }

  performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClicked(message: string): void {
      this.pageTitle = 'Product List:' + message;
  }
}

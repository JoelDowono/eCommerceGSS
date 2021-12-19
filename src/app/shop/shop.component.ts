import { Products } from './../models/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  total = 0;
  nbProduct = 6;
  articles: any;
  product!: Products;
  constructor(private productService: ProductsService) { }

  paginate(event: any){
    console.log(event.page);
    this.productService.GetArticles(event.page).subscribe({
      next: (response: any) => {
        this.articles = response.data;
        console.log(response);
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

  ngOnInit(): void {
    this.productService.GetArticles(0).subscribe({
      next: (response: any) => {
        this.total = response.count;
        this.articles = response.data;
      },
      error : (error: any) => {
        console.log(error);
      }
    })

    /*this.productService.createArticle(this.product).subscribe({

    })*/
  }
}


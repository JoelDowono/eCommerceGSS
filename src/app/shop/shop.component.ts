import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  articles: any;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.GetArticles().subscribe({
      next: (response: any) => {
        this.articles = response.data;
        console.log(response);
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

}

/*

*/

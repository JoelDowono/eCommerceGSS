import { Products } from './../models/products';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { SelectItem } from 'primeng/api';
import { CartService } from '../services/cart.service';

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

  searchInput: string = "";
  searchResults: any;
  showSearchResult = false;
  searchResultMessage: string = ""

  constructor(private productService: ProductsService, private cartService: CartService) { }

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
  }

  addToCart(article: Products){
      this.cartService.addArticleToCart(article,1);
      console.log(this.cartService.articles);
  }

  searchInputChange() {
    if(this.searchInput.length > 1) {
      this.productService.searchArticle(this.searchInput).subscribe(
        (response) => {
          this.showSearchResult = true;
          this.searchResults = response.data;
          this.searchResultMessage = response.message;
        },
        (error) => {

        }
      )
    } else {
      this.showSearchResult = false;
    }
  }

}


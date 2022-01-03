import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { OrderArticle } from './../models/order-article';
import { Products } from './../models/products';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  articles: OrderArticle[] = [];

  constructor(private storageService: StorageService) {
    this.articles = this.storageService.getCart();
  }

  addArticleToCart(product: Products, quantity: number) {
    const exist = this.articles.find(a => a.product?.id === product.id);
    if(!exist) {
      this.articles.push({product,quantity})
      this.storageService.saveCart(this.articles)
    }
  }

  removeArticleFromCart(product: Products) {
    this.articles = this.articles.filter( a => a.product?.id != product.id);
    this.storageService.saveCart(this.articles)
  }

  saveCart(){
    this.storageService.saveCart(this.articles);
  }

  getCart() {
   this.articles = this.storageService.getCart()
  }

  clearCart() {
    this.articles = [];
    this.storageService.saveCart(this.articles);
  }

}

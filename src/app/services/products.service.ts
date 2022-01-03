import { Products } from './../models/products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = "http://localhost:3000";
  constructor(private http: HttpClient) {
  }

  GetArticles(page: number): Observable<Response>{
    let url = this.url + '/api/articles?page=' + page;
    return this.http.get<Response>(url);
  }

  GetAllArticles(): Observable<Response>{
    let url = this.url + '/api/articles';
    return this.http.get<Response>(url);
  }

  //création d'un article
  createArticle(products: Products): Observable<Products> {
    let url = this.url + '/api/articles';
    return this.http.post<Products>(url, products);
  }

  //modification de l'article
  updateArticle(product: Products) {
    let url = this.url + '/api/articles/' + product.id;
    return this.http.put<Products>(url, product);
  }

  deleteArticle(id: number) {
    let url = this.url + '/api/articles/' + id;
    return this.http.delete<Products>(url);
  }
}




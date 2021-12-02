import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = "http://localhost:3000";
  constructor(private http: HttpClient) {

  }
  GetArticles(): any{
    //let headers: any = {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
    let url = this.url + '/api/articles';
    return this.http.get(url);
  }
}

/*
// Get Clubs


 // Club creation request

*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  createOrder(orderPackage): Observable<any>{
    let url = this.url + '/api/orders';
    return this.http.post(url,orderPackage);
  }

  getAllOrders() : Observable<any>{
    let url = this.url + '/api/orders';
    return this.http.get(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  Login(user: any): any{
    let url = this.url + '/api/login';
    return this.http.post(url, user);
  }
}


/*
// Login request

*/

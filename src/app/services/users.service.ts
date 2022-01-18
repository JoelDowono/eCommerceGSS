import { Users } from './../models/users';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  login(user: any): any {
    let url = this.url + '/api/login';
    return this.http.post(url, user);
  }

  register(user: any): any {
    let url = this.url + '/api/users';
    return this.http.post(url, user)
  }

  getUser(id: number) {
    let url = this.url + '/api/users/' + id;
    return this.http.get<Users>(url);
  }
}




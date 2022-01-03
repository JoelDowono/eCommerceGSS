import { StorageService } from './../services/storage.service';
import { Users } from './../models/users';
import { OrdersService } from './../services/orders.service';
import { Orders } from './../models/orders';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user;
  orders: Orders[] = [];
  constructor(private usersService: UsersService, private ordersService: OrdersService,private storageService: StorageService ) { }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.usersService.getUser(user.id).subscribe({
      next: (response: any) => {
        this.user = response.data;
      },
      error : (error: any) => {
        console.log(error);
      }
    })
  }

}

/*
this.productService.GetArticles(0).subscribe({
      next: (response: any) => {
        this.total = response.count;
        this.articles = response.data;
      },
      error : (error: any) => {
        console.log(error);
      }
    })
*/

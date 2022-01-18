import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user;
  constructor(private usersService: UsersService, private storageService: StorageService) { }

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

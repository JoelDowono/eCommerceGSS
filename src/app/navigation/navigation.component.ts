import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  items!: MenuItem[];
  isSuperAdmin: boolean = false;
  isAdmin: boolean = false;
  constructor(private storageService: StorageService, private router: Router, public cartService: CartService) { }

  ngOnInit(): void {
    if (this.storageService.isTokenPresent() == true) {
      this.items = [{
        label: 'Déconnexion',
        icon: 'pi pi-sign-out',
        command: () => {
          this.storageService.removeUserToken();
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Mon compte',
        icon: 'pi pi-user-edit',
        command: () => {
          this.router.navigate(['/account'])
        }
      }
    ]
    }
    else {
      this.items = [{
        label: 'Connexion',
        icon: 'pi pi-sign-in',
        command: () => {
          this.router.navigate(['/login']);
        }
      }]
    }


    this.isSuperAdmin = this.storageService.isUserRoleSuperAdmin();
    this.isAdmin = this.storageService.isUserRoleAdmin();

    console.log(this.isAdmin);
    console.log(this.isSuperAdmin);


  }

}

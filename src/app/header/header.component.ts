import { StorageService } from './../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  isSuperAdmin: boolean = true;
  isAdmin: boolean = true;
  constructor(private storageService: StorageService, private router: Router) { }

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
  }

}

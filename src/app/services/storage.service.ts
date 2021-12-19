import { unsupported } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sensitiveStorage: Storage;

  constructor() {
    this.sensitiveStorage = window.localStorage;
  }

  saveUserAndToken(token: string, user: any) {
    this.sensitiveStorage.setItem("MY_USER", JSON.stringify(user));
    this.sensitiveStorage.setItem("MY_TOKEN", token);
  }

  removeUserToken(){
    this.sensitiveStorage.clear();
  }

  getToken(){
    return this.sensitiveStorage.getItem("MY_TOKEN");
  }

  isTokenPresent(): boolean {
		const token = this.getToken();
		if (token === null || token === undefined || token === '') {
			return false;
		} else {
			return true;
		}
	}



  //verifie le role de l'utilisateur
  //superadmin

  getUser() {
    let userString = this.sensitiveStorage.getItem("MY_USER");
    return JSON.parse(userString? userString: '{}');
  }

  isUserRoleSuperAdmin(): boolean {
    const user = this.getUser();
    if (user?.roleId === 1) {
      return true;
    }
    else {
      return false;
    }
  }

  isUserRoleAdmin(): boolean {
    const user = this.getUser();
    if (user?.roleId === 2) {
      return true;
    }
    else {
      return false;
    }
  }

  /*
  isConnect(): boolean {
    let userString = this.sensitiveStorage.getItem("MY_USER")
    if (userString) {
      return true;
    }
    else {
      return false;
    }
  }*/
}

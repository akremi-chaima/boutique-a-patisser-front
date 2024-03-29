import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { LoginResponseInterface } from '../models/login-response.interface';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConstsHelper } from '../consts.helper';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  save(data: LoginResponseInterface): void {
    localStorage.setItem('token', JSON.stringify(data));
    if (data.role == ConstsHelper.ROLE_CUSTOMER) {
      this.router.navigate(['private/orders']);
    } else {
      this.router.navigate(['private/administration/orders']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // check if token is valid and the connected user has the access to the current route
    if (this.checkToken() && route.data['expectedRoles'].indexOf(this.getToken().role) !== -1) {
      return true;
    } else {
      // logout user if he has not the access to the current route
      localStorage.removeItem('token');
      this.router.navigate(['login']);
      return false;
    }
  }

  /**
   * Get token information
   */
  getToken(): LoginResponseInterface {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return null;
  }


  /**
   * Check token expiration
   */
  public checkToken() {
    if (this.getToken() != null) {
      const today = new Date();
      const day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
      // check token expiration
      if (parseInt(this.getToken().expiration, 10) >= parseInt(today.getUTCFullYear() + '' + (today.getMonth() + 1 ) + '' + day, 10)) {
        return true;
      }
    }
    this.router.navigate(['login']);
    return false;
  }

}

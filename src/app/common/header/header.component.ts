import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LocalStorageService } from '../../api-services/local-storage.service';
import { ConstsHelper } from '../../consts.helper';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BasketItemInterface } from '../../models/basket-item.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isAdministrator: boolean;
  basketItems: Array<BasketItemInterface>;
  isBrowser: any;
  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private localStorageService: LocalStorageService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.basketItems = [];
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // display administration or customer menu by listening to route
      if (this.localStorageService.getToken() && this.localStorageService.getToken().role === ConstsHelper.ROLE_ADMINISTRATOR) {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
    });
    if (this.isBrowser){
      setInterval(function(){
        if (localStorage && localStorage.getItem(ConstsHelper.BASKET_NAME)) {
          this.basketItems = JSON.parse(localStorage.getItem(ConstsHelper.BASKET_NAME)) as Array<BasketItemInterface>;
        }
      }.bind(this), 1000);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

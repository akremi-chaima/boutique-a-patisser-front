import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { LocalStorageService } from '../../api-services/local-storage.service';
import { ConstsHelper } from '../../consts.helper';
import { CommonModule } from '@angular/common';

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

  constructor(
    public router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      // display administration or customer menu by listening to route
      if (this.localStorageService.getToken() && this.localStorageService.getToken().role === ConstsHelper.ROLE_ADMINISTRATOR) {
        this.isAdministrator = true;
      } else {
        this.isAdministrator = false;
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

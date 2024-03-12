import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ConstsHelper } from '../../../consts.helper';
import { BasketItemInterface } from '../../../models/basket-item.interface';
import { OrdersService } from '../../../api-services/orders.service';
import {response} from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
    imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {

  isBrowser: any;
  basketItems: Array<BasketItemInterface>;
  errorMessage: string|null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private orderService: OrdersService,
    private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.basketItems = [];
    if (this.isBrowser){
      setInterval(function(){
        if (localStorage && localStorage.getItem(ConstsHelper.BASKET_NAME)) {
          this.basketItems = JSON.parse(localStorage.getItem(ConstsHelper.BASKET_NAME)) as Array<BasketItemInterface>;
        }
      }.bind(this), 1000);
    }
  }

  saveOrder() {
    this.orderService.create({pastries: this.basketItems}).subscribe(
      response => {
        localStorage.removeItem(ConstsHelper.BASKET_NAME);
        this.router.navigate(['private/orders'])
      }, error => {
        this.errorMessage = 'oups la commande ne peut pas etre confirmé'
      }
    )
  }

  delete(basketItem: BasketItemInterface) {
    if (localStorage.getItem(ConstsHelper.BASKET_NAME)) {
      let basketContent = JSON.parse(localStorage.getItem(ConstsHelper.BASKET_NAME)) as Array<BasketItemInterface>;
      let basketIndex = basketContent.findIndex(item => item.pastryId == basketItem.pastryId && item.formatName == basketItem.formatName);
      if (basketIndex != -1) {
        basketContent.splice(basketIndex,1);
        localStorage.setItem(ConstsHelper.BASKET_NAME, JSON.stringify(basketContent));
      }
    }
  }
}

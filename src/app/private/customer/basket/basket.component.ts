import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ConstsHelper } from '../../../consts.helper';
import { BasketItemInterface } from '../../../models/basket-item.interface';

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

  constructor(
    @Inject(PLATFORM_ID) private platformId,
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
}

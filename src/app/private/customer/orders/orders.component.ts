import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../api-services/local-storage.service';
import { OrdersService } from '../../../api-services/orders.service';
import { OrderInterface } from '../../../models/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Array<OrderInterface> = [];

  constructor(
    private localStorageService: LocalStorageService,
    private ordersService: OrdersService,
  ) {
  }

  ngOnInit() {
    this.ordersService.getCustomerOrders().subscribe(ordersResponse => {
      this.orders = ordersResponse;
    });
  }
}


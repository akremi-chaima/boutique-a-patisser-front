import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../api-services/orders.service';
import { OrderInterface } from '../../../models/order.interface';
import { OrderFilterInterface } from '../../../models/order-filter.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {

  orders: Array<OrderInterface> = [];
  filter: OrderFilterInterface;

  constructor(
    private ordersService: OrdersService,
  ) {
  }

  ngOnInit() {
    this.filter = {
      userName: null,
      statusId: null,
      date: null,
    };
    this.ordersService.getAllOrders(this.filter).subscribe(ordersResponse => {
      this.orders = ordersResponse;
    });
  }
}

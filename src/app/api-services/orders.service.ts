import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { OrderInterface } from '../models/order.interface';
import { OrderFilterInterface } from '../models/order-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private apiService: ApiService) {}

  /**
   * Get customer orders list
   */
  getCustomerOrders(): Observable<Array<OrderInterface>> {
    return this.apiService.get<Array<OrderInterface>>('private/customer/orders');
  }

  /**
   * Get all orders list
   */
  getAllOrders(filter: OrderFilterInterface): Observable<Array<OrderInterface>> {
    return this.apiService.post<Array<OrderInterface>>('private/orders', filter);
  }
}

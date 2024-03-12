import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../api-services/orders.service';
import { OrderInterface } from '../../../models/order.interface';
import { OrderFilterInterface } from '../../../models/order-filter.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusService } from '../../../api-services/status.service';
import { StatusInterface } from '../../../models/status.interface';

@Component({
  selector: 'app-orders-list',
  standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {

  statusList: Array<StatusInterface> = [];
  selectedStatusId: number|null;
  orders: Array<OrderInterface> = [];
  selectedOrder: OrderInterface|null;
  filter: OrderFilterInterface;

  constructor(
    private ordersService: OrdersService,
    private statusService: StatusService,
  ) {
  }

  ngOnInit() {
    this.selectedOrder = null;
    this.selectedStatusId = null;
    this.filter = {
      userName: null,
      statusId: null,
      date: null,
    };
    this.ordersService.getAllOrders(this.filter).subscribe(ordersResponse => {
      this.orders = ordersResponse;
    });
    this.statusService.getList().subscribe(
      response => {
        this.statusList = response;
      }
    );
  }

  setSelectedOrder(order: OrderInterface) {
    this.selectedOrder = order;
    this.selectedStatusId = this.statusList.find(orderStatus => orderStatus.name == order.status).id;
  }

  save() {
    this.ordersService.updateStatus(this.selectedOrder.id, this.selectedStatusId).subscribe(
      response => {
        window.location.reload()
      }
    );
  }
}

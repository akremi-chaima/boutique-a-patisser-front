import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../api-services/orders.service';
import { OrderInterface } from '../../../models/order.interface';
import { OrderFilterInterface } from '../../../models/order-filter.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { StatusService } from '../../../api-services/status.service';
import { StatusInterface } from '../../../models/status.interface';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
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
  displaySearchForm: boolean = false;
  formSubmitted: boolean = false;
  form: FormGroup;
  control: FormControl;

  constructor(
    private ordersService: OrdersService,
    private statusService: StatusService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.selectedOrder = null;
    this.selectedStatusId = null;
    this.statusService.getList().subscribe(
      response => {
        this.statusList = response;
        this.initForm();
        this.getOrdersList(null, null, null);
      }
    );
  }

  initForm() {
    this.control = this.formBuilder.control('', Validators.required);
    this.form = this.formBuilder.group({});
    this.form.addControl('userName', this.formBuilder.control('', []));
    this.form.addControl('statusId', this.formBuilder.control('', []));
    this.form.addControl('date', this.formBuilder.control('', []));
  }

  getOrdersList(userName: string|null, statusId: string|null, date: string|null) {
    if (date) {
      const splitDate = date.split('/');
      date = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
    }

    this.filter = {
      userName: [null, ''].indexOf(userName) != -1 ? null : userName,
      statusId: [null, ''].indexOf(statusId) != -1 ? null : parseInt(statusId),
      date: [null, ''].indexOf(date) != -1 ? null : date,
    };
    this.ordersService.getAllOrders(this.filter).subscribe(ordersResponse => {
      this.orders = ordersResponse;
    });
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

  searchFormVisibility(display: boolean) {
    this.displaySearchForm = display;
  }

  search() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.getOrdersList(this.form.get('userName').value, this.form.get('statusId').value, this.form.get('date').value);
    }
  }

  reset() {
    this.formSubmitted = false;
    this.searchFormVisibility(false);
    this.initForm();
    this.getOrdersList(null, null, null);
  }
}

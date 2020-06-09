import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {OrderApiService} from '../../../shared/services/order-api.service';
import {Order} from '../../../shared/models/order.interface';

@Component({
  selector: 'mbs-ad-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdersComponent implements OnInit {

  orders: Order[];

  constructor(private orderApiService: OrderApiService) {
    this.orders = [];
  }

  ngOnInit(): void {
    this.orders = this.orderApiService.getAllOrders();
  }

}

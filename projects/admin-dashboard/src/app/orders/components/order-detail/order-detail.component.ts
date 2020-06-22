import { OrderApiService } from '../../../shared/services/backend/order-api.service';
import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../../../shared/models/order.interface';

@Component({
  selector: 'mbs-ad-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailComponent implements OnInit {

  orderId: string;
  order: Order;

  constructor(private activatedRoute: ActivatedRoute,
              private orderApiService: OrderApiService) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe()
      .subscribe(params => {
        this.orderId = params['id'];
        this.order = this.orderApiService.getOrder(this.orderId);
      });
  }

}

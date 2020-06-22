import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { OrderApiService } from '../../../shared/services/backend/order-api.service';
import {Order} from '../../../shared/models/order.interface';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';

@Component({
  selector: 'mbs-ad-help-request-list',
  templateUrl: './help-request-list.component.html',
  styleUrls: ['./help-request-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class HelpRequestListComponent implements OnInit {

  orders: Order[];
  isMobile: boolean;

  constructor(private orderApiService: OrderApiService,
              public breakPointObserverService: BreakPointObserverService) {
    this.orders = [];
    this.isMobile = false;
  }

  ngOnInit(): void {
    this.orders = this.orderApiService.getAllOrders();
    this.orderApiService.getAllColiveryOrders()
      .pipe()
      .subscribe(response => console.log('response from colivery', response));
  }

}

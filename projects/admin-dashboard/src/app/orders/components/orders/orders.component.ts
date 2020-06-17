import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {OrderApiService} from '../../../shared/services/order-api.service';
import {Order} from '../../../shared/models/order.interface';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'mbs-ad-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  isMobile: boolean;

  /*
  export interface Order {
    createdAt: string;
    hint: string;
    id: string;
    maxPrice: number;
    userId: number;
    items: OrderItem[];
    source: SOURCE;
    status: STATUS;
    updatedAt: string;
  }
*/
  displayedColumns: string[] = ['updatedAt', 'userId', 'source', 'status'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private orderApiService: OrderApiService,
              public breakPointObserverService: BreakPointObserverService) {
    this.orders = [];
    this.isMobile = false;
  }

  ngOnInit(): void {


    this.orders = this.orderApiService.getAllOrders();
    this.dataSource = new MatTableDataSource(this.orders);
    console.log(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.orderApiService.getAllColiveryOrders()
      .pipe()
      .subscribe(response => console.log('response from colivery', response));
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

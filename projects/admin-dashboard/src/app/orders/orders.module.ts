import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {OrderDetailComponent, OrdersComponent} from './public-api';
import {OrdersRoutingModule} from './orders-routing.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule
  ],
  exports: [
    OrdersComponent,
    OrderDetailComponent
  ]
})
export class OrdersModule {

}

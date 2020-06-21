import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateOrderComponent, OrderDetailComponent, OrdersComponent} from './public-api';
import {OrdersRoutingModule} from './orders-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateOrderComponent,
    OrdersComponent,
    OrderDetailComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OrdersRoutingModule,
        SharedModule,
        StyleLibModule,
        TranslateModule
    ],
  exports: [
    CreateOrderComponent,
    OrdersComponent,
    OrderDetailComponent
  ]
})
export class OrdersModule {

}

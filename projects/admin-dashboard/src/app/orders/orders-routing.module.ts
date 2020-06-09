import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderDetailComponent, OrdersComponent} from './public-api';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: ':id',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {

}
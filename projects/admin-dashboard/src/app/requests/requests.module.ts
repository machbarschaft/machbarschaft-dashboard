import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RequestsComponent} from './public-api';
import {RequestsRoutingModule} from './requests-routing.module';

@NgModule({
  declarations: [
    RequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RequestsRoutingModule
  ],
  exports: [
    RequestsComponent
  ]
})
export class RequestsModule {

}

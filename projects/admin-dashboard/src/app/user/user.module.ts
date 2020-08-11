import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {RouterModule} from '@angular/router';
import {UserRoutingModule} from './user-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {GoogleMapsModule} from '@angular/google-maps';

@NgModule({
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    StyleLibModule,
    UserRoutingModule,
    GoogleMapsModule
  ],
  providers: []
})
export class UserModule {

}

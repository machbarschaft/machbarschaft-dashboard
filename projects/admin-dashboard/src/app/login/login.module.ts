import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './components/public-api';
import {LoginRoutingModule} from './login-routing.module';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
        StyleLibModule
    ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {

}

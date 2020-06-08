import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StyleLibModule} from '../../../style-lib/src/lib/style-lib.module';
import {LoginModule} from './login/login.module';
import {RequestsModule} from './requests/requests.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    RequestsModule,
    StyleLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

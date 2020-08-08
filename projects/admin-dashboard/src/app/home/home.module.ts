import {NgModule} from '@angular/core';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    StyleLibModule,
    RouterModule,
    HomeRoutingModule,
    TranslateModule,
  ],
  providers: []
})
export class HomeModule {}

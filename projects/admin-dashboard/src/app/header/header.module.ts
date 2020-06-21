import {NgModule} from '@angular/core';
import {HeaderComponent} from './public-api';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StyleLibModule,
    TranslateModule
  ]
})
export class HeaderModule {

}

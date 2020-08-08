import {NgModule} from '@angular/core';
import {FooterComponent} from './public-api';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    StyleLibModule,
    TranslateModule
  ]
})
export class FooterModule {

}

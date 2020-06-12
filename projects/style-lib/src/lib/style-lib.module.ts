import {NgModule} from '@angular/core';
import {StyleLibComponent} from './style-lib.component';
import {ButtonPrimaryDirective, ButtonSecondaryDirective} from './public-api';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    StyleLibComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ],
  imports: [
    LayoutModule
  ],
  exports: [
    StyleLibComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ]
})
export class StyleLibModule {
}

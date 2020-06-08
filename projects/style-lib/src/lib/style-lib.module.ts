import {NgModule} from '@angular/core';
import {StyleLibComponent} from './style-lib.component';
import {ButtonPrimaryDirective, ButtonSecondaryDirective} from './public-api';

@NgModule({
  declarations: [
    StyleLibComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ],
  imports: [],
  exports: [
    StyleLibComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ]
})
export class StyleLibModule {
}

import {NgModule} from '@angular/core';
import {StyleLibComponent} from './style-lib.component';
import {ButtonLightDirective, ButtonPrimaryDirective, ButtonSecondaryDirective} from './public-api';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    StyleLibComponent,
    ButtonLightDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ],
  imports: [
    LayoutModule
  ],
  exports: [
    StyleLibComponent,
    ButtonLightDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective
  ]
})
export class StyleLibModule {
}

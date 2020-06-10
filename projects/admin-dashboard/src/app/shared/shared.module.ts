import {NgModule} from '@angular/core';
import {ConstantsTranslatorPipe} from './pipes/public-api';

@NgModule({
  declarations: [
    ConstantsTranslatorPipe
  ],
  exports: [
    ConstantsTranslatorPipe
  ]
})
export class SharedModule {

}

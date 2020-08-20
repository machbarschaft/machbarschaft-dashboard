import {NgModule} from '@angular/core';
import {ConstantsTranslatorPipe} from './pipes/public-api';
import {AuthenticationGuard} from './guards/authentication-guard';

@NgModule({
  declarations: [
    ConstantsTranslatorPipe
  ],
  exports: [
    ConstantsTranslatorPipe
  ],
  providers: [
    AuthenticationGuard
  ]
})
export class SharedModule {

}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateHelpRequestComponent, HelpRequestComponent, HelpRequestListComponent} from './public-api';
import {HelpRequestRoutingModule} from './help-request-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateHelpRequestComponent,
    HelpRequestListComponent,
    HelpRequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HelpRequestRoutingModule,
    SharedModule,
    StyleLibModule,
    TranslateModule
  ],
  exports: [
    CreateHelpRequestComponent,
    HelpRequestListComponent,
    HelpRequestComponent
  ]
})
export class HelpRequestModule {

}

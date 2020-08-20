import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleLibModule } from 'projects/style-lib/src/lib/style-lib.module';
import { RegistrationComponent } from './registration.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        FormsModule,
        RegistrationRoutingModule,
        StyleLibModule,
        RegistrationRoutingModule,
        GoogleMapsModule,
        TranslateModule
    ]
})
export class RegistrationModule { }




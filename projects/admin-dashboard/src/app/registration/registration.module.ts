import { RegistrationRoutingModule } from './registration-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StyleLibModule } from 'projects/style-lib/src/lib/style-lib.module';
import { RegistrationComponent } from './registration.component';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule,
    StyleLibModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }




import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    StyleLibModule
  ]
})
export class ResetPasswordModule { }

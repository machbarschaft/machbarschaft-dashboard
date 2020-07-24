import { RolesComponent } from './components/roles/roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StyleLibModule} from '../../../../style-lib/src/lib/style-lib.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    RolesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RolesRoutingModule,
    StyleLibModule,
    TranslateModule
  ],
  exports: [
    RolesComponent
  ]
})
export class RolesModule { }

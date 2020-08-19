import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {UserManagementRoutingModule} from './user-management-routing.module';
import {UserManagementComponent} from './user-management.component';



@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    UserManagementRoutingModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserManagementModule { }

// importieren in app module und user m compoennt importieren...

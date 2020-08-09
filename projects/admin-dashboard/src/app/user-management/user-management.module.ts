import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';



@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    UserManagementComponent
  ]
})
export class UserManagementModule { }

// importieren in app module und user m compoennt importieren...

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../shared/public-api';

type RoleError = 'unknown error' | 'not found';

@Component({
  selector: 'mbs-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class RolesComponent {

  addAdminForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  emailError: boolean = false;
  success: boolean = false;
  failure: RoleError;
  addedUser: string;

  constructor(private userService: UserService,
              private changeDetectorRef: ChangeDetectorRef) { }

  addAdmin(): void {
    this.failure = null;
    if (this.addAdminForm.valid) {
      // Form is valid and reset error
      this.emailError = false;
      const email = this.addAdminForm.get('email').value;
      this.userService.makeUserToAdmin(email).subscribe(
        () => {
          this.success = true;
          this.addedUser = email;
          this.addAdminForm.reset();
          this.changeDetectorRef.detectChanges();
        }, (error) => {
          if (error && error.status) {
            this.failure = 'not found';
          } else {
            this.failure = 'unknown error';
          }
          this.success = false;
          this.changeDetectorRef.detectChanges();
        });
    } else {
      if (this.addAdminForm.get('email').invalid) {
        this.emailError = true;
        this.success = false;
      }
    }
  }

}

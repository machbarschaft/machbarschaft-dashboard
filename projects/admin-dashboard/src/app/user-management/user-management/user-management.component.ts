import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/public-api';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'mbs-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  // Form
  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPasswordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)]),

  });

  passwordError: boolean = false;
  resetSuccessful: boolean = false;
  errorString: string;

  mode: string;
  actionCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
    });

  }

  resetPassword() {
    console.log({ P: this.resetPasswordForm.value.newPassword });
    if (this.resetPasswordForm.value.newPassword === this.resetPasswordForm.value.newPasswordConfirm) {
      this.authService.confirmPasswordReset(this.actionCode, this.resetPasswordForm.value.newPassword)
        .then((res) => {
          this.passwordError = false;
          this.resetPasswordForm.disable();
          this.resetSuccessful = true;
        })
        .catch(
          (err) => {
            this.errorString = err.message;
            this.passwordError = true;
            console.log({ err });
          }
        );
    }
  }

}


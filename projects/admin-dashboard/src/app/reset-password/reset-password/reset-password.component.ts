import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../shared/public-api';

@Component({
  selector: 'mbs-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  emailError: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if (this.resetPasswordForm.valid) {
      // Form is valid and reset all errors
      this.authService.sendMailResetPassword(this.resetPasswordForm.value.email)
      .then(result => console.log(result))
      .catch(error => console.log(error));
      this.router.navigate(['login']).then();

    } else {
      if (this.resetPasswordForm.get('email').invalid) {
        this.emailError = true;
      }
    }
  }
}

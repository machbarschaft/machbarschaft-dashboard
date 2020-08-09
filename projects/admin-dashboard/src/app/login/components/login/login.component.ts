import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {AuthResponse} from '../../../shared/public-api';

@Component({
  selector: 'mbs-ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  // Used to display error messages in forms
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: string;
  noInternetConnection: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              public breakpointObserver: BreakPointObserverService) {}

  onFormSubmit(): void {
    if (this.loginForm.valid) {
      // Form is valid and reset all errors
      this.resetErrors();
      // Observer for login
      this.authService.login$(this.loginForm.value.email, this.loginForm.value.password).subscribe((authResponse: AuthResponse) => {
        if (authResponse.successful) {
          this.router.navigate(['help-request']).then();
        } else {
          this.loginError = authResponse.message;
        }
      }, () => {
        this.noInternetConnection = true;
      });
    } else {
      if (this.loginForm.get('email').invalid) {
        this.emailError = true;
      }
      if (this.loginForm.get('password').invalid) {
        this.passwordError = true;
      }
    }
  }

  private resetErrors(): void {
    this.loginError = null;
    this.emailError = false;
    this.passwordError = false;
    this.noInternetConnection = false;
  }

  forgotPassword() {
    this.router.navigate(['reset-password']).then();
  }
}

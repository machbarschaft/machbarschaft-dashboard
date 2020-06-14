import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';

@Component({
  selector: 'mbs-ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  emailError: boolean = false;
  passwordError: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService,
              public breakpointObserver: BreakPointObserverService) {}

  onFormSubmit(): void {
    if(this.loginForm.valid) {
      console.debug("Login at Firebase with E-Mail: ", this.loginForm.get('email'))
      // TODO login feedback
      this.authService.login$(this.loginForm.value.email, this.loginForm.value.password);
      // Reset error indicator
      this.emailError = false;
      this.passwordError = false;
    } else {
      if (this.loginForm.get('email').invalid) {
        this.emailError = true;
      }
      if (this.loginForm.get('password').invalid) {
        this.passwordError = true;
      }
      console.error("Form not Valid. Error performing login")
    }
  }
}

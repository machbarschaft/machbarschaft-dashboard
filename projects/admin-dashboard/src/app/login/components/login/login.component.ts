import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
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
  // Used to display error messages in forms
  emailError: boolean = false;
  passwordError: boolean = false;
  loginError: string = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              public breakpointObserver: BreakPointObserverService) {}

  onFormSubmit(): void {
    if(this.loginForm.valid) {
      // Form is valid and reset all errors
      this._reset_errors_();
      // Observer for login
      let loginObser = this.authService.login$(this.loginForm.value.email, this.loginForm.value.password);
      // Reset error indicator
      loginObser.subscribe({
        next(msg) { 
          if (msg.successful) {
            this.router.navigate(['order']).then();
          } else {
            super.loginError = msg.message;
            console.error("Login.component: loginError", this.loginError);
          }
        },
        complete() { 
          console.log('Login.component: Observer complete'); 
        }
      })
    } else {
      if (this.loginForm.get('email').invalid) {
        this.emailError = true;
      }
      if (this.loginForm.get('password').invalid) {
        this.passwordError = true;
      }
      console.error("Form not Valid. Error performing login")
    }
    console.log("Login.component: End", this.loginError);
  }
  
  _reset_errors_() {
    this.loginError = null;
    this.emailError = false;
    this.passwordError = false;
  }
}

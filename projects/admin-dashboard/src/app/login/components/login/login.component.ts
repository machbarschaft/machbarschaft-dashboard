import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakPointObserverService} from '../../../../../../style-lib/src/lib/services/break-point-observer.service';
import {AuthResponse} from '../../../shared/public-api';

export enum LoginError {
  'UNAUTHORIZED' = 'UNAUTHORIZED',
  'INVALID_USER_PASSWORD' = 'INVALID_USER_PASSWORD',
  'NO_INTERNET_CONNECTION' = 'NO_INTERNET_CONNECTION'
}

@Component({
  selector: 'mbs-ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginError: string;
  submitted: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef,
              public breakpointObserver: BreakPointObserverService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const queryMessage = params['message'];
      this.loginError = queryMessage === 'unauthorized' ? LoginError.UNAUTHORIZED : null;
      this.changeDetectorRef.detectChanges();
    });
  }

  onFormSubmit(): void {
    this.submitted = false;
    if (this.loginForm.valid) {
      // Form is valid and reset all errors
      this.resetErrors();
      // Observer for login
      this.authService.login$(this.loginForm.value.email, this.loginForm.value.password).subscribe((authResponse: AuthResponse) => {
        if (authResponse.successful) {
          this.router.navigate(['help-request']).then();
        } else {
          this.loginError = LoginError.INVALID_USER_PASSWORD;
          this.changeDetectorRef.detectChanges();
        }
      }, () => {
        this.loginError = LoginError.NO_INTERNET_CONNECTION;
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  private resetErrors(): void {
    this.loginError = null;
    this.changeDetectorRef.detectChanges();
  }

  getAbstractControl(key: string): AbstractControl | null {
    return this.loginForm.get(key);
  }
}

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'mbs-ad-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  email = '';
  password = '';

  login(): void {
    this.authService.login(this.email, this.password);
  }
}

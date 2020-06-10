import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private authService: AuthService) { }

  email = '';
  password = '';
  repeatPassword = '';

  ngOnInit(): void {
  }

  registration(): void {
    if( this.password === this.repeatPassword) {
      this.authService.register(this.email, this.password);

    }
  }

}

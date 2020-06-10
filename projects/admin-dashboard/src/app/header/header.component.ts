import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationGuardService} from '../shared/services/authentication-guard.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'mbs-ad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private authenticationGuardService: AuthenticationGuardService,
              private authService: AuthService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.isAuthenticated = false;
  }

  ngOnInit(): void {
    this.authenticationGuardService.isAuthenticated()
      .pipe()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        console.log('isAuthenticated', this.isAuthenticated);
        this.changeDetectorRef.detectChanges();
      });
  }

  logout(): void {
    this.authService.logout();
  }

}


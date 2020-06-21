import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationGuardService} from '../shared/services/authentication-guard.service';
import {AuthService} from '../shared/services/auth.service';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'mbs-ad-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  menuOpen: boolean;

  constructor(private authenticationGuardService: AuthenticationGuardService,
              private authService: AuthService,
              public breakpointObserver: BreakPointObserverService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef) {
    this.isAuthenticated = false;
    this.menuOpen = false;
  }

  ngOnInit(): void {
    this.authenticationGuardService.isAuthenticated()
      .pipe()
      .subscribe(authenticated => {
        this.isAuthenticated = authenticated;
        this.changeDetectorRef.detectChanges();
      });
  }

  logout(): void {
    this.menuOpen = false;
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  navigate(target: string): void {
    this.router.navigate([target]).then(() => this.toggleMenu());
  }

}


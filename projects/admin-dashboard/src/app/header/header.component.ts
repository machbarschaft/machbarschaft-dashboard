import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationGuardService} from '../shared/services/authentication-guard.service';
import {AuthService} from '../shared/services/auth.service';
import {BreakPointObserverService} from '../../../../style-lib/src/lib/services/break-point-observer.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MbsTranslateService} from '../shared/services/mbs-translate.service';

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
  language: string = 'de';

  constructor(private authenticationGuardService: AuthenticationGuardService,
              private authService: AuthService,
              public breakpointObserver: BreakPointObserverService,
              private router: Router,
              private translateService: TranslateService,
              private mbsTranslateService: MbsTranslateService,
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
    this.changeDetectorRef.detectChanges();
  }

  navigate(target: string): void {
    this.router.navigate([target]).then(() => this.toggleMenu());
  }

  changeLanguage(newLanguage: 'de' | 'en'): void {
    // works fine -> change as dropdown
    if (this.language !== newLanguage) {
      this.language = this.language === 'de' ? 'en' : 'de';
      this.translateService.use(this.language).subscribe(() => this.mbsTranslateService.changeLanguage(this.language));
    }
  }

}


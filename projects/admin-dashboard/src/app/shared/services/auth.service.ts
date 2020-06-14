import {SodiumCryptoService} from './sodium-crypto.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationGuardService} from './authentication-guard.service';
import {Observable, ReplaySubject} from 'rxjs';
import {AuthResponse} from '../models/common.interface';
import {FIREBASE_LOGIN_ERROR_ENUM, LOGIN_ERROR_ENUM} from '../models/constants.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private sodium: SodiumCryptoService,
              private authenticationGuardService: AuthenticationGuardService) {
  }

  login$(email: string, password: string): Observable<AuthResponse> {
    const subject$ = new ReplaySubject<AuthResponse>(1);
    this.firebaseAuth.signInWithEmailAndPassword(email, this.sodium.hash(password))
      .then((result) => {
        this.router.navigate(['order']).then();
        const refreshToken = result.user.refreshToken;
        const authToken = result.user['xa'];
        localStorage.setItem('token', authToken);
        localStorage.setItem('refreshToken', refreshToken);

        this.authenticationGuardService.changeAuthenticated(true);
        subject$.next({message: 'success', successful: true});
        subject$.complete();
      }).catch((error) => {
      console.log('error', error);
      window.alert(error.message);
      this.authenticationGuardService.changeAuthenticated(false);
      const authResponse = this.getAuthResponseForError(error ? error.code : error);
      subject$.next(authResponse);
      subject$.complete();
    });
    return subject$.asObservable();
  }

  logout(): void {
    this.firebaseAuth.signOut()
      .then(() => {
        this.router.navigate(['login']).then();
        localStorage.clear();
        this.authenticationGuardService.changeAuthenticated(false);
      }).catch((error) => {
      console.log(error);
    });
  }

  async register(email: string, password: string): Promise<any> {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, this.sodium.hash(password));
  }

  getToken(): Observable<string> {
    return this.firebaseAuth.idToken;
  }

  private getAuthResponseForError(message: string): AuthResponse {
    let errorMessage;

    if (message === FIREBASE_LOGIN_ERROR_ENUM.EMAIL_NOT_FOUND || message === FIREBASE_LOGIN_ERROR_ENUM.INVALID_PASSWORD) {
      errorMessage = LOGIN_ERROR_ENUM.EMAIL_OR_PASSWORD_INVALID;
    } else {
      errorMessage = LOGIN_ERROR_ENUM.OTHER;
    }

    return {successful: false, message: errorMessage};
  }

}

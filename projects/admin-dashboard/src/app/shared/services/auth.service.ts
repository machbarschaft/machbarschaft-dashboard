import {SodiumCryptoService} from './sodium-crypto.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationGuardService} from './authentication-guard.service';
import {Observable, ReplaySubject} from 'rxjs';
import {AuthResponse} from '../models/common.interface';


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
        this.router.navigate(['order']);
        console.log(result);
        this.authenticationGuardService.changeAuthenticated(true);
        subject$.next({message: 'success', successful: true});
        subject$.complete();
      }).catch((error) => {
      window.alert(error.message);
      this.authenticationGuardService.changeAuthenticated(false);
      subject$.next({message: error, successful: false});
      subject$.complete();
    });
    return subject$.asObservable();
  }

  logout(): void {
    this.firebaseAuth.signOut()
      .then((result) => {
        this.router.navigate(['login']);
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

}

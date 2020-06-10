import { SodiumCryptoService } from './sodium-crypto.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {AuthenticationGuardService} from './authentication-guard.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private router: Router,
              private sodium: SodiumCryptoService,
              private authenticationGuardService: AuthenticationGuardService) { }

  login(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, this.sodium.hash(password))
      .then((result) => {

        this.router.navigate(['order']);
        console.log(result);
        this.authenticationGuardService.changeAuthenticated(true);
      }).catch((error) => {
        window.alert(error.message);
        this.authenticationGuardService.changeAuthenticated(false);
      });
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

}

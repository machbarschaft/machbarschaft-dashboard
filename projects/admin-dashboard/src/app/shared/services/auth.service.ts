import { SodiumCryptoService } from './sodium-crypto.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebasAuth: AngularFireAuth, private router: Router, private sodium: SodiumCryptoService) { }

  login(email: string, password: string) {
    this.firebasAuth.signInWithEmailAndPassword(email, this.sodium.hash(password))
      .then((result) => {

        this.router.navigate(['order']);
        console.log(result);

      }).catch((error) => {
        window.alert(error.message);
      });
  }

  logout(): void {
    this.firebasAuth.signOut()
      .then((result) => {
        this.router.navigate(['login']);
      }).catch((error) => {
        console.log(error);
      });
  }

  async register(email: string, password: string): Promise<any> {
    return this.firebasAuth.createUserWithEmailAndPassword(email, this.sodium.hash(password));
  }

}

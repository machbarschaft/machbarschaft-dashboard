import { SodiumCryptoService } from './../../shared/services/sodium-crypto.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebasAuth: AngularFireAuth, private router: Router, private sodium: SodiumCryptoService) { }

  login(email: string, password: string) {
    this.firebasAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        this.sodium.hash(password);
        this.router.navigate(['order']);
        console.log(result);

      }).catch((error) => {
        window.alert(error.message);
      });
  }


}

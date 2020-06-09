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

  constructor(private firebasAuth: AngularFireAuth, private router: Router) { }

  login(email: string, password: string) {
    // passwort mus gehashed werden
    this.firebasAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {

        this.router.navigate(['order']);
        console.log(result);

      }).catch((error) => {
        window.alert(error.message);
      });
  }



/* sodium nötig: (npm install sodium)
  hash(token: string, length: number = 64) {
    const hash = sodium.crypto_generichash(length, sodium.from_string(token));
    return sodium.to_hex(hash);
}
*/
}

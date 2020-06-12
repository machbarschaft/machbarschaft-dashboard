import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService {

  #isAuthenticated: ReplaySubject<boolean>;

  constructor() {
    this.#isAuthenticated = new ReplaySubject<boolean>(1);

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.#isAuthenticated.next(true);
    } else {
      this.#isAuthenticated.next(false);
    }
  }

  changeAuthenticated(isAuthenticated: boolean): void {
    this.#isAuthenticated.next(isAuthenticated);
  }

  isAuthenticated(): ReplaySubject<boolean> {
    return this.#isAuthenticated;
  }

}

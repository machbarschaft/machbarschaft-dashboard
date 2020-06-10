import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService {

  #isAuthenticated: ReplaySubject<boolean>;

  constructor() {
    this.#isAuthenticated = new ReplaySubject<boolean>(1);
    this.#isAuthenticated.next(false);
  }

  changeAuthenticated(isAuthenticated: boolean): void {
    this.#isAuthenticated.next(isAuthenticated);
  }

  isAuthenticated(): ReplaySubject<boolean> {
    return this.#isAuthenticated;
  }

}

import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService {

  readonly #isAuthenticated: ReplaySubject<boolean>;

  constructor(private storageService: StorageService) {
    this.#isAuthenticated = new ReplaySubject<boolean>(1);

    const refreshToken = this.storageService.getItem('refreshToken');
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

import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MbsTranslateService {

  #languageChanged: ReplaySubject<string>;

  constructor() {
    this.#languageChanged = new ReplaySubject<string>(1);
  }

  languageChanged(): Observable<string> {
    return this.#languageChanged.asObservable();
  }

  changeLanguage(language: string): void {
    this.#languageChanged.next(language);
  }

}

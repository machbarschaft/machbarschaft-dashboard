import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ConstantsTranslatorService {

  readonly #values: { [key: string]: string };

  constructor() {
    this.#values = {
      HOTLINE: 'Hotline',
      APP: 'App',
      TO_BE_DELIVERED: 'in Bearbeitung',
      DELIVERED: 'ausgeliefert',
      CONSUMER_CANCELLED: 'storniert',
      ACCEPTED: 'akzeptiert',
    };
  }

  getTranslationForKey(key: string): string {
    const value = this.#values[key];
    return value || key;
  }

}

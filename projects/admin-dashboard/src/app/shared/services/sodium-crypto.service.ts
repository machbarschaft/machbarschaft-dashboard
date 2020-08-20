import * as sodium from 'libsodium-wrappers';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SodiumCryptoService {

  readonly #sodium: any;

  constructor() {
    this.#sodium = sodium;
  }

  hash(token: string, length: number = 64) {
    const text = this.#sodium.from_string(token);
    const hash = window['sodium'].crypto_generichash(length, text);
    return window['sodium'].to_hex(hash);
  }

}

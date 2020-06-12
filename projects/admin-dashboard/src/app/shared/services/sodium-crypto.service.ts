import * as sodium from 'libsodium-wrappers';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class SodiumCryptoService {

  readonly #sodium: any;

  constructor() {
    this.#sodium = sodium;
  }

  hash(token: string, length: number = 64) {
    console.log('sodium in hash', this.#sodium);
    const text = this.#sodium.from_string(token);
    console.log('text', text);
    const hash = window['sodium'].crypto_generichash(length, text);
    console.log('hash', hash);
    const hex = window['sodium'].to_hex(hash);
    console.log('hex', hex);
    return hex;
  }

}

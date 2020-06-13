import {Injectable} from '@angular/core';

export interface Cookie {
  key: string;
  value: string;
  validity?: number | null;
}

// ToDo: define a prefix with a config service
@Injectable({ providedIn: 'root' })
export class CookieService {

  /**
   * creates a cookie specified by cookie as param
   * @param cookie
   */
  createCookie(cookie: Cookie): void {
    document.cookie = `${cookie.key}=${cookie.value}` + cookie.validity ? `expires=${new Date(cookie.validity).toUTCString()}` : '';
  }

  /**
   * find all cookies that are currently stored for current host
   */
  getAllCookies(): Cookie[] {
    const cookies: Cookie[] = [];
    const foundCookies = document.cookie.split(';');
    foundCookies.forEach(cookie => {
      const array = cookie.split('=');
      cookies.push({
        key: array[0],
        value: array[1]
      });
    });

    return cookies;
  }

  /**
   * check if currently a cookie is already stored with this key
   * @param key
   */
  hasCookie(key: string): boolean {
    return !!this.getCookieForKey(key);
  }

  /**
   * find cookie for key, if found this cookie will be returned otherwise null will be returned
   * @param key
   */
  getCookieForKey(key: string): Cookie | null {
    const cookies: Cookie[] = this.getAllCookies();
    return cookies.find(cookie => cookie.key === key);
  }

  /**
   * just delete a single cookie specified by the key as param
   * @param key
   */
  removeCookie(key: string): void {
    const cookie = this.getCookieForKey(key);
    this.setCookieExpired(cookie);
  }

  /**
   * delete all cookies that are found for the current host
   */
  clearCookies(): void {
    const cookies: Cookie[] = this.getAllCookies();
    cookies.forEach(cookie => {
      // set validity to expired date
      this.setCookieExpired(cookie);
    });
  }

  /**
   * sets expired date to cookie so that it is marked as expired and will be deleted
   * @param cookie
   */
  private setCookieExpired(cookie: Cookie): void {
    if (cookie) {
      this.createCookie({key: cookie.key, value: cookie.value, validity: this.createExpiryDate()});
    }
  }

  /**
   * create Date with 01.01.1970 00:00:00, which means that something is expired
   */
  private createExpiryDate(): number {
    return new Date(1970, 0, 0, 0, 0, 0, 0).getTime();
  }

}

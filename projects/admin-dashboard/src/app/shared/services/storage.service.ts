import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  clear(): void {
    sessionStorage.clear();
  }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  getItem(key: string): any {
    sessionStorage.getItem(key);
  }

}

import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  clear(): void {
    localStorage.clear();
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | any {
    localStorage.getItem(key);
  }

}

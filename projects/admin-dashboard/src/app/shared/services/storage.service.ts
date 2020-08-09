import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  clear(): void {
    sessionStorage.clear();
  }

}

import { Injectable } from '@angular/core';

export const KEY_CACHE = {
  ACCESS_TOKEN: 'accessToken',
  FULLNAME: 'fullname',
  ROLE: 'role',
};

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}

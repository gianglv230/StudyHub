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

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  // Trong cache.service.ts
  clearSession(): void {
    this.removeItem(KEY_CACHE.ACCESS_TOKEN);
    this.removeItem(KEY_CACHE.FULLNAME);
    this.removeItem(KEY_CACHE.ROLE);
  }
}

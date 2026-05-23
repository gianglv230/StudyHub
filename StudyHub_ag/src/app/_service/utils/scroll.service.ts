import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  scrollToElement(selector: string, offset: number = 0) {
    if (!isPlatformBrowser(this.platformId)) return; // chỉ chạy trên browser

    const element = document.getElementById(selector) as HTMLElement;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }

  scrollToTop() {
    if (!isPlatformBrowser(this.platformId)) return; // SSR-safe

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

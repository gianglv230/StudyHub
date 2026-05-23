import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScrollService } from './_service/utils/scroll.service';
import { GlobalModal } from "./_shared/global-modal/global-modal";
import { ToastGlobalComponent } from "./_shared/components/toast-global/toast-global.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalModal, ToastGlobalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, OnDestroy {
  private routerSubscription!: Subscription;

  constructor(
    private readonly router: Router,
    private scrollService: ScrollService,
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // window.scrollTo({ top: 0, behavior: 'instant' });
        this.scrollToTop();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  isVisible = false;

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isVisible = scrollPosition > 300;
  }

  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}

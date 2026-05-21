import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthService } from './api/auth/auth.service';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isHandling401 = false;

  //   constructor(private authService: AuthService) {}
  constructor(
    private readonly router: Router,
    // private readonly authService: AuthService
  ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor triggered');

    const isPublicApi =
      req.url.includes('/recommend');

    const authReq = req.clone({
      withCredentials: !isPublicApi, // ❌ false nếu là API public
    });

    // const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isHandling401) {
          this.isHandling401 = true;
          console.warn('Access token expired or unauthorized.');

          // return this.authService.refreshToken().pipe(
          //   switchMap(() => {
          //     this.isHandling401 = false;
          //     // const retryReq = req.clone({ withCredentials: true });
          //     const retryReq = req.clone({
          //       withCredentials: !isPublicApi, // ❌ false nếu là API public
          //     });
          //     // ✅ Reload sau khi refresh thành công (đảm bảo ngOnInit chạy lại)
          //     setTimeout(() => window.location.reload(), 300);
          //     return next.handle(retryReq);
          //   }),
          //   catchError((refreshError) => {
          //     this.isHandling401 = false;
          //     console.error('Refresh token failed', refreshError);
          //     this.handleRefreshFail();
          //     return throwError(() => refreshError);
          //   })
          // );

        }

        return throwError(() => error);
      })
    );
  }

  /** Xử lý khi refresh token thất bại */
  private handleRefreshFail(): void {
    console.log('Remove customer');
    localStorage.removeItem('customer');

    const guardedRoutes = [
      '/thanh-toan-thanh-cong',
      '/thanh-toan-that-bai',
      '/thong-tin-ca-nhan',
      '/cac-tour-cua-toi',
      '/dat-tour',
      '/cac-tour-cua-toi/tour-da-dat',
    ];

    const currentUrl = this.router.url;
    const isGuarded = guardedRoutes.some((route) =>
      currentUrl.startsWith(route)
    );

    if (isGuarded) {
      // Nếu route cần login mà refresh fail -> về trang chủ
      window.location.href = '/trang-chu';
      // this.router.navigate(['trang-chu']);
    } else {
      // Nếu không cần login -> reload lại để reset state và cookie lỗi
      // setTimeout(() => {
      //   this.router
      //     .navigateByUrl('/', { skipLocationChange: true })
      //     .then(() => this.router.navigate([currentUrl]));
      // }, 300);
      setTimeout(() => (window.location.href = window.location.href), 300);
    }
  }
}

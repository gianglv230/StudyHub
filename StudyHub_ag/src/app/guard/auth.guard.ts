import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CacheService, KEY_CACHE } from '../_service/utils/cache.service';

// 1. Guard kiểm tra Đăng nhập chung
export const authGuard: CanActivateFn = (route, state) => {
  const cacheService = inject(CacheService);
  const router = inject(Router);

  const token = cacheService.getItem(KEY_CACHE.ACCESS_TOKEN);

  if (token) {
    return true;
  }

  // Nếu chưa đăng nhập, điều hướng về trang chủ/guest hoặc trang login
  router.navigate(['/']); 
  return false;
};

// 2. Guard kiểm tra Quyền (Role)
export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const cacheService = inject(CacheService);
    const router = inject(Router);

    const userRole = cacheService.getItem(KEY_CACHE.ROLE);

    // Kiểm tra xem role của user có nằm trong danh sách các role được phép không
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    // Nếu không có quyền, đá về trang phù hợp với role hiện tại hoặc về trang chủ
    if (userRole === 'ADMIN') router.navigate(['/admin']);
    else if (userRole === 'TEACHER') router.navigate(['/giao-vien']);
    else if (userRole === 'STUDENT') router.navigate(['/hoc-vien']);
    else router.navigate(['/']);

    return false;
  };
};
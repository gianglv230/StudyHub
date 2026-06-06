import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../../_service/utils/toast.service';
import { ERROR_CODE_RESPONSE } from '../../../../utils/validator/error-code.validator';
import { CacheService, KEY_CACHE } from '../../../_service/utils/cache.service';
import { ROLE, ROLE_TEXT } from '../../../../utils/const/role.const';
import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-base',
//   template: '',
// })
@Injectable({
  providedIn: 'root',
})
export abstract class BaseComponent {
  toastService = inject(ToastService);

  constructor(
    private readonly cacheService: CacheService,
    private readonly route: ActivatedRoute,
  ) {}

  showSuccess(message?: string, delay = 1000) {
    this.toastService.show({
      message: message || '',
      type: 'success',
      delay: delay,
    });
  }

  showDanger(message?: string, delay = 1000) {
    this.toastService.show({
      message: message || '',
      type: 'fail',
      delay: delay,
    });
  }

  handleError(err: any) {
    console.log('Error: ', err);
    this.showDanger(ERROR_CODE_RESPONSE[err.error.code] || err.error.message);

    // Dùng ?. để tránh crash nếu err.error không tồn tại
    const isCode9999 = err?.error?.code == 9999;

    if (isCode9999) {
      this.showDanger('Phải chọn ảnh và video nếu có');
    }
  }

  isStudent(): boolean {
    return this.cacheService.getItem(KEY_CACHE.ROLE) == 'STUDENT';
  }

  isTeacher(): boolean {
    return this.cacheService.getItem(KEY_CACHE.ROLE) == 'TEACHER';
  }

  isAdmin(): boolean {
    return this.cacheService.getItem(KEY_CACHE.ROLE) == 'ADMIN';
  }

  get fullname(): string {
    return this.cacheService.getItem(KEY_CACHE.FULLNAME) || '';
  }

  get role(): string {
    return ROLE_TEXT[this.cacheService.getItem(KEY_CACHE.ROLE) || ''] || '';
  }
}

import { inject, Injectable } from '@angular/core';
import { ToastService } from '../../../_service/utils/toast.service';
import { ERROR_CODE_RESPONSE } from '../../../../utils/validator/error-code.validator';

// @Component({
//   selector: 'app-base',
//   template: '',
// })
@Injectable({
  providedIn: 'root',
})
export abstract class BaseComponent {
  toastService = inject(ToastService);

  constructor() {}

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
    this.showDanger(ERROR_CODE_RESPONSE[err.error.code]);
  }
}

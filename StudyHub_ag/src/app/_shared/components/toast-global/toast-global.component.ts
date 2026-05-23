import { Component, inject, TemplateRef } from '@angular/core';
import { Toast, ToastService } from '../../../_service/utils/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast-global',
  imports: [NgbToastModule],
  templateUrl: './toast-global.component.html',
  styleUrl: './toast-global.component.css',
})
export class ToastGlobalComponent {
  toastService = inject(ToastService);

  CLASS_TOAST = {
    success: 'bg-success text-light',
    fail: 'bg-danger text-light',
    info: 'bg-primary-container text-light',
    warning: 'bg-warning text-light',
  };

  // showStandard(template: TemplateRef<any>) {
  //   this.toastService.show({ template });
  // }

  // showSuccess(template: TemplateRef<any>) {
  //   this.toastService.show({
  //     template,
  //     classname: 'bg-success text-light',
  //     delay: 10000,
  //   });
  // }

  // showDanger(template: TemplateRef<any>) {
  //   this.toastService.show({
  //     template,
  //     classname: 'bg-danger text-light',
  //     delay: 15000,
  //   });
  // }

  // showStandard() {
  //   this.toastService.show({
  //     message: "Standard",
  //     classname: 'bg-white text-primary fw-bold'
  //    });
  // }

  // showSuccess() {
  //   this.toastService.show({
  //     message: "Success",
  //     classname: 'bg-success text-light',
  //     delay: 10000,
  //   });
  // }

  // showDanger() {
  //   this.toastService.show({
  //     message: "Fail",
  //     classname: 'bg-danger text-light',
  //     delay: 15000,
  //   });
  // }

  classToast(toast: Toast): string{
    return toast.classname || this.CLASS_TOAST[toast.type] || '';
  }

  hiddenToast(toast: Toast) {
    this.toastService.remove(toast);
  }

  ngOnDestroy(): void {
    this.toastService.clear();
  }
}

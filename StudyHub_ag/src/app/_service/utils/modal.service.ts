import {
  Injectable,
  Type,
} from '@angular/core';

import { Subject } from 'rxjs';

export interface ModalOptions {
  title?: string;
  component: Type<any>;
  data?: any;
  size?: 'sm' | 'lg' | 'xl';
  /** 'static': không đóng khi click ngoài. true/false: đóng/không có backdrop */
  backdrop?: boolean | 'static';
  /** false: không đóng khi nhấn ESC */
  keyboard?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<ModalOptions | null>();

  modalState$ = this.modalSubject.asObservable();

  open(options: ModalOptions) {
    this.modalSubject.next(options);
  }

  close() {
    this.modalSubject.next(null);
  }
}
import {
  Injectable,
  Type,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';

export interface ModalOptions<T = any> {
  title?: string;
  component: Type<any>;
  data?: any;
  size?: 'sm' | 'lg' | 'xl';
  /** 'static': không đóng khi click ngoài. true/false: đóng/không có backdrop */
  backdrop?: boolean | 'static';
  /** false: không đóng khi nhấn ESC */
  keyboard?: boolean;

  onClose?: Subject<T>;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<ModalOptions | null>();

  modalState$ = this.modalSubject.asObservable();

  open<T = any>(options: ModalOptions): Observable<T> {
    const closeSubject = new Subject<T>();

    this.modalSubject.next({
      ...options,
      onClose: closeSubject,
    });

    return closeSubject.asObservable();
  }

  close(result?: any) {
    this.modalSubject.next(null);
  }
}
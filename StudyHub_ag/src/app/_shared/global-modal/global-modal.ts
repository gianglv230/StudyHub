import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalOptions, ModalService } from '../../_service/utils/modal.service';
import { MODAL_DATA } from '../../_service/utils/token';

@Component({
  selector: 'app-global-modal',
  imports: [],
  template: '',
})
export class GlobalModal implements OnInit {
  private currentModalRef: NgbModalRef | null = null;

  constructor(
    private modalService: ModalService,
    private ngbModal: NgbModal,
    private injector: Injector,
  ) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe((options) => {
      if (!options) {
        this.currentModalRef?.close();
        this.currentModalRef = null;
        return;
      }

      this.openModal(options);
    });
  }

  private openModal(options: ModalOptions): void {
    // Tạo custom injector để cung cấp MODAL_DATA cho component con
    const customInjector = Injector.create({
      providers: [
        { provide: MODAL_DATA, useValue: options.data ?? null },
      ],
      parent: this.injector,
    });

    this.currentModalRef = this.ngbModal.open(options.component, {
      size: options.size,
      centered: true,
      backdrop: options.backdrop ?? 'static',
      keyboard: options.keyboard ?? false,
      injector: customInjector,
    });

    // Reset ref khi modal bị đóng (bởi user click backdrop, ESC, hoặc NgbActiveModal)
    this.currentModalRef.hidden.subscribe(() => {
      this.currentModalRef = null;
    });
  }
}

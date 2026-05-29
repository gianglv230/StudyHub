import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceManagement } from '../resource-management/resource-management';
import { ModalOptions } from '../../_service/utils/modal.service';
import { ResourcePickerService, SelectionMode } from '../../_service/utils/resource-picker.service';
import { MODAL_DATA } from '../../_service/utils/token';

@Component({
  selector: 'app-resource-modal',
  imports: [ResourceManagement],
  templateUrl: './resource-modal.html',
  styleUrl: './resource-modal.css',
})
export class ResourceModal implements OnInit, OnDestroy {
  modalOptions!: ModalOptions;
  selectedResources: ChildrenResourceResponse[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private readonly pickerService: ResourcePickerService,
    @Inject(MODAL_DATA) public data: { selectionMode?: SelectionMode } | null,
  ) {}

  ngOnInit() {
    const mode: SelectionMode = this.data?.selectionMode ?? 'multiple';
    this.pickerService.setMode(mode);
    this.pickerService.clear();
    this.pickerService.isPicking = true;
  }

  ngOnDestroy() {
    this.pickerService.isPicking = false;
  }

  submit() {
    this.activeModal.close(this.pickerService.selectedResources$.value);
  }
}

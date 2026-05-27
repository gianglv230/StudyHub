import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResourceManagement } from "../resource-management/resource-management";

@Component({
  selector: 'app-resource-modal',
  imports: [ResourceManagement],
  templateUrl: './resource-modal.html',
  styleUrl: './resource-modal.css',
})
export class ResourceModal {
  constructor(
    public activeModal: NgbActiveModal,
    // @Inject(MODAL_DATA) public data: any,
  ) {}
}

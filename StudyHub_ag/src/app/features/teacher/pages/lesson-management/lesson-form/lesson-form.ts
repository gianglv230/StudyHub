import { Component } from '@angular/core';
import { ModalService } from '../../../../../_service/utils/modal.service';
import { ResourceModal } from '../../../../../_shared/resource-modal/resource-modal';

@Component({
  selector: 'app-lesson-form',
  imports: [],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.css',
})
export class LessonForm {
  constructor(private readonly modalService: ModalService) {}

  openResourceModal() {
    this.modalService.open({
      component: ResourceModal,
      size: 'xl'
    });
  }
}

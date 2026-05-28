import { Component } from '@angular/core';
import { ModalService } from '../../../../../_service/utils/modal.service';
import { ResourceModal } from '../../../../../_shared/resource-modal/resource-modal';
import { Editor } from "../../../../../_shared/components/editor/editor";

@Component({
  selector: 'app-lesson-form',
  imports: [Editor],
  templateUrl: './lesson-form.html',
  styleUrl: './lesson-form.css',
})
export class LessonForm {
  constructor(private readonly modalService: ModalService) { }

  openResourceModal() {
    this.modalService.open({
      component: ResourceModal,
      size: 'xl',
      data: { selectionMode: 'single' }, // 'single' | 'multiple'
    }).subscribe((resources) => {
      console.log(resources);
    });
  }
}

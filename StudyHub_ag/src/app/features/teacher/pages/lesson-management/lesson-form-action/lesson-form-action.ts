import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lesson-form-action',
  imports: [],
  templateUrl: './lesson-form-action.html',
  styleUrl: './lesson-form-action.css',
})
export class LessonFormAction {
  @Output() submit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  save(){
    this.submit?.emit();
  }

  restore(){
    this.cancel?.emit();
  }
}

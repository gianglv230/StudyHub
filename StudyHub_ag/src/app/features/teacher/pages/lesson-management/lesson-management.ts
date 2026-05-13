import { Component } from '@angular/core';
import { LessonFormAction } from "./lesson-form-action/lesson-form-action";
import { LessonForm } from "./lesson-form/lesson-form";

@Component({
  selector: 'app-lesson-management',
  imports: [LessonFormAction, LessonForm],
  templateUrl: './lesson-management.html',
  styleUrl: './lesson-management.css',
})
export class LessonManagement {

}

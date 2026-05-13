import { Component } from '@angular/core';
import { LessonList } from "./lesson-list/lesson-list";
import { LessonContent } from "./lesson-content/lesson-content";

@Component({
  selector: 'app-lesson-detail',
  imports: [LessonList, LessonContent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css',
})
export class LessonDetail {

}

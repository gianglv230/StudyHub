import { Component } from '@angular/core';
import { LessonMain } from "./lesson-main/lesson-main";
import { LessonMinor } from "./lesson-minor/lesson-minor";

@Component({
  selector: 'app-lesson-content',
  imports: [LessonMain, LessonMinor],
  templateUrl: './lesson-content.html',
  styleUrl: './lesson-content.css',
})
export class LessonContent {

}

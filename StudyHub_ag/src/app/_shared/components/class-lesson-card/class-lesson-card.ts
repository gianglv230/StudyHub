import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-class-lesson-card',
  imports: [DatePipe],
  templateUrl: './class-lesson-card.html',
  styleUrl: './class-lesson-card.css',
})
export class ClassLessonCard {
  @Input() classLesson?: ClassLessonBasicResponse;
  @Input() index?: number;
}

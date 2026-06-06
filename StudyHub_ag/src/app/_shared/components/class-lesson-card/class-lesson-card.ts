import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-class-lesson-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './class-lesson-card.html',
  styleUrl: './class-lesson-card.css',
})
export class ClassLessonCard {
  @Input() classLesson?: ClassLessonBasicResponse;
  @Input() index?: number;
  @Input() isStudent?: boolean;
  @Input() classSlug?: string;
}

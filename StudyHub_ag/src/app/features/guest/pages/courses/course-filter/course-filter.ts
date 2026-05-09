import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-filter',
  imports: [],
  templateUrl: './course-filter.html',
  styleUrl: './course-filter.css',
})
export class CourseFilter {
  @Input()
  title?: string;
}

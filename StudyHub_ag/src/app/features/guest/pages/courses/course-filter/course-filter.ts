import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-course-filter',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './course-filter.html',
  styleUrl: './course-filter.css',
})
export class CourseFilter {
  @Input()
  title?: string;

  @Input()
  target?: string;

  @Input()
  targets?: string[];

  isActive(target: string){
    return this.target == target;
  }
}

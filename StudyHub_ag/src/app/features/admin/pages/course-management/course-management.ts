import { Component } from '@angular/core';
import { CourseHeader } from "./course-header/course-header";
import { CourseSearchbox } from "./course-searchbox/course-searchbox";
import { CourseResult } from "./course-result/course-result";

@Component({
  selector: 'app-course-management',
  imports: [CourseHeader, CourseSearchbox, CourseResult],
  templateUrl: './course-management.html',
  styleUrl: './course-management.css',
})
export class CourseManagement {

}

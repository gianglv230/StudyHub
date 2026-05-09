import { Component } from '@angular/core';
import { CategoryList } from "./category-list/category-list";
import { CourseFilter } from "./course-filter/course-filter";
import { SubjectFilter } from "./subject-filter/subject-filter";

@Component({
  selector: 'app-courses',
  imports: [CategoryList, CourseFilter, SubjectFilter],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {

}

import { Component } from '@angular/core';
import { CategoryList } from "../courses/category-list/category-list";
import { CourseFilter } from "../courses/course-filter/course-filter";
import { ClassesList } from "./classes-list/classes-list";
import { SubjectFilter } from "../courses/subject-filter/subject-filter";

@Component({
  selector: 'app-classes',
  imports: [CategoryList, CourseFilter, ClassesList, SubjectFilter],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class Classes {

}

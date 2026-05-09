import { Component } from '@angular/core';
import { ClassesList } from "../classes/classes-list/classes-list";
import { CourseFilter } from "../courses/course-filter/course-filter";

@Component({
  selector: 'app-classes-of-teacher',
  imports: [ClassesList, CourseFilter],
  templateUrl: './classes-of-teacher.html',
  styleUrl: './classes-of-teacher.css',
})
export class ClassesOfTeacher {

}

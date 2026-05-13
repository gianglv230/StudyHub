import { Component } from '@angular/core';
import { StudentHeader } from "./student-header/student-header";
import { StudentSearchbox } from "./student-searchbox/student-searchbox";
import { StudentResult } from "./student-result/student-result";

@Component({
  selector: 'app-student-management',
  imports: [StudentHeader, StudentSearchbox, StudentResult],
  templateUrl: './student-management.html',
  styleUrl: './student-management.css',
})
export class StudentManagement {

}

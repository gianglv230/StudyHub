import { Component } from '@angular/core';
import { ClassAttendance } from "../../../../_shared/class-attendance/class-attendance";

@Component({
  selector: 'app-teacher-attendance',
  imports: [ClassAttendance],
  templateUrl: './teacher-attendance.html',
  styleUrl: './teacher-attendance.css',
})
export class TeacherAttendance {

}

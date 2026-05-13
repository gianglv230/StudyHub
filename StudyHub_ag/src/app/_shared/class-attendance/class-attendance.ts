import { Component } from '@angular/core';
import { AttendanceSidebar } from "./attendance-sidebar/attendance-sidebar";
import { AttendanceMain } from "./attendance-main/attendance-main";

@Component({
  selector: 'app-class-attendance',
  imports: [AttendanceSidebar, AttendanceMain],
  templateUrl: './class-attendance.html',
  styleUrl: './class-attendance.css',
})
export class ClassAttendance {

}

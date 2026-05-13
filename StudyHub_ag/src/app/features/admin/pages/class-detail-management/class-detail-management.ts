import { Component } from '@angular/core';
import { ClassHeader } from "../class-management/class-header/class-header";
import { ClassDetailInfo } from "./class-detail-info/class-detail-info";
import { ClassStudents } from "./class-students/class-students";

@Component({
  selector: 'app-class-detail-management',
  imports: [ClassHeader, ClassDetailInfo, ClassStudents],
  templateUrl: './class-detail-management.html',
  styleUrl: './class-detail-management.css',
})
export class ClassDetailManagement {

}

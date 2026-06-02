import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mapGender } from '../../../../../../utils/account-map';
import { DatePipe } from '@angular/common';
import {
  EnrollmentStatusColorMap,
  EnrollmentStatusMap,
} from '../../../../../../utils/const/status.const';
import { SuspendStudent } from '../suspend-student/suspend-student';

@Component({
  selector: 'app-class-students',
  imports: [DatePipe],
  templateUrl: './class-students.html',
  styleUrl: './class-students.css',
})
export class ClassStudents {
  @Input() students?: StudentInClassResponse[];
  // 1. Khai báo đúng kiểu dữ liệu trong dấu < > và phải có từ khóa 'new'
  @Output() suspendStudent = new EventEmitter<StudentInClassResponse>();
  @Output() transferStudent = new EventEmitter<StudentInClassResponse>();

  mapGender(gender: boolean) {
    return mapGender(gender);
  }

  mapEnrollmentStatus(student: StudentInClassResponse) {
    return student.status ? EnrollmentStatusMap[student.status] : '';
  }

  mapEnrollmentColorStatus(student: StudentInClassResponse) {
    return student.status ? EnrollmentStatusColorMap[student.status] : '';
  }

  // 2. Hàm xử lý khi click button
  onSuspendStudent(student: StudentInClassResponse) {
    // Sử dụng .emit() để bắn dữ liệu ra component cha
    this.suspendStudent.emit(student);
  }

  // 2. Hàm xử lý khi click button
  onTransferStudent(student: StudentInClassResponse) {
    // Sử dụng .emit() để bắn dữ liệu ra component cha
    this.transferStudent.emit(student);
  }
}

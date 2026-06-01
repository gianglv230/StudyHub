import { Component, Input } from '@angular/core';
import { mapGender } from '../../../../../../utils/account-map';
import { DatePipe } from '@angular/common';
import { EnrollmentStatusColorMap, EnrollmentStatusMap } from '../../../../../../utils/const/status.const';

@Component({
  selector: 'app-class-students',
  imports: [DatePipe],
  templateUrl: './class-students.html',
  styleUrl: './class-students.css',
})
export class ClassStudents {
  @Input() students?: StudentInClassResponse[];

  mapGender(gender: boolean) {
    mapGender(gender);
  }

  mapEnrollmentStatus(student: StudentInClassResponse) {
    return student.status ? EnrollmentStatusMap[student.status] : '';
  }

  mapEnrollmentColorStatus(student: StudentInClassResponse) {
    return student.status ? EnrollmentStatusColorMap[student.status] : '';
  }
}

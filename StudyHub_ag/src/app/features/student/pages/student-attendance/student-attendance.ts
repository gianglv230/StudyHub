import { Component, OnInit } from '@angular/core';
import { StudentAttendanceService } from '../../service/student-attendance/student-attendance.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { initData } from '../../../../../utils/init-data';
import { DatePipe } from '@angular/common';
import {
  CLASS_STATUS_ATTENDANCE,
  STATUS_ATTENDANCE,
} from '../../../../../utils/const/attendance.const';
import { BaseComponent } from '../../../../_shared/components/base/base-component';

@Component({
  selector: 'app-student-attendance',
  imports: [DatePipe, RouterLink],
  templateUrl: './student-attendance.html',
  styleUrl: './student-attendance.css',
})
export class StudentAttendance implements OnInit {
  data?: StudentAttendanceResponse;

  totalAttendances?: number;
  totalAbsent?: number;
  isStudent: boolean = true;
  slug = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly attendanceService: StudentAttendanceService,
    private readonly base: BaseComponent
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('class-slug') || '';
    this.isStudent = this.base.isStudent();
    if (this.slug) {
      initData<StudentAttendanceResponse>(
        this.attendanceService.getMyStudentAttendanceClass(this.slug),
        (data) => {
          console.log(data);
          this.data = data;
          this.totalAttendances = this.data.attendances.length;
          this.totalAbsent = this.data.attendances.filter(
            (item) => item.status === 'ABSENT',
          ).length;
        },
      );
    }
  }

  get attendances(): StudentAttendanceRowResponse[] {
    return [...(this.data?.attendances || [])].reverse();
  }

  statusAttendance(status: string): string {
    return STATUS_ATTENDANCE[status];
  }

  classStatus(status: string): string {
    return CLASS_STATUS_ATTENDANCE[status];
  }

  get presentRatio(): number {
    if (this.totalAttendances == 0) return 0;
    return Math.round(
      100 - ((this.totalAbsent || 0) / (this.totalAttendances || 1)) * 100,
    );
  }
}

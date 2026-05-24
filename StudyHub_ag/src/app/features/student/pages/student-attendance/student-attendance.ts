import { Component, OnInit } from '@angular/core';
import { StudentAttendanceService } from '../../service/student-attendance/student-attendance.service';
import { ActivatedRoute } from '@angular/router';
import { initData } from '../../../../../utils/init-data';
import { DatePipe } from '@angular/common';
import {
  CLASS_STATUS_ATTENDANCE,
  STATUS_ATTENDANCE,
} from '../../../../../utils/const/attendance.const';

@Component({
  selector: 'app-student-attendance',
  imports: [DatePipe],
  templateUrl: './student-attendance.html',
  styleUrl: './student-attendance.css',
})
export class StudentAttendance implements OnInit {
  data?: StudentAttendanceResponse;

  totalAttendances?: number;
  totalAbsent?: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly attendanceService: StudentAttendanceService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('class-slug') || '';
    if (slug) {
      initData<StudentAttendanceResponse>(
        this.attendanceService.getMyStudentAttendanceClass(slug),
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

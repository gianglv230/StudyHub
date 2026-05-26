import { Component, OnInit } from '@angular/core';
import { ClassAttendance } from '../../../../_shared/class-attendance/class-attendance';
import { AttendanceService } from '../../../../_service/attendance/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { initData } from '../../../../../utils/init-data';

@Component({
  selector: 'app-teacher-attendance',
  imports: [ClassAttendance],
  templateUrl: './teacher-attendance.html',
  styleUrl: './teacher-attendance.css',
})
export class TeacherAttendance implements OnInit {
  
  data?: SessionDateResponse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly attendanceService: AttendanceService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('class-slug');
    if (!slug) {
      return;
    }
    this.initSessionDate(slug);
  }

  initSessionDate(slug: string){
    initData<SessionDateResponse>(
      this.attendanceService.getSessionDate(slug),
      (data) => {
        console.log(data);
        this.data = data;
      }
    )
  }

  get sessionDateResponse(): SessionDateResponse | undefined{
    return this.data;
  }

}

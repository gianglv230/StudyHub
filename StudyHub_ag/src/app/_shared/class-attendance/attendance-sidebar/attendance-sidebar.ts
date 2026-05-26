import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { isSameDay } from '../../../../utils/date-util';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-attendance-sidebar',
  imports: [DatePipe, RouterLink],
  templateUrl: './attendance-sidebar.html',
  styleUrl: './attendance-sidebar.css',
})
export class AttendanceSidebar implements OnInit {
  @Input()
  sessionDates: Date[] = []; // để render sidebar
  // @Input() attendanceDates: Date[] = []; // ngày đã điểm danh thật

  // @Output() sessionSelected = new EventEmitter<{ date: Date }>();

  today = new Date();

  @Input()
  selectedDate = this.today;

  protected isSameDay(date1: any, date2: any): boolean {
    return new Date(date1).toDateString() === new Date(date2).toDateString();
  }

  ngOnInit(): void {
    // this.sessionSelected.emit({ date: this.today });
    // if (changes['sessionDates']) {

    // const hasAttendanceToday = this.attendanceDates?.some((date) =>
    //   isSameDay(new Date(date), this.today),
    // );

    // if (!hasAttendanceToday) {
    //   this.sessionDates = hasAttendanceToday
    //     ? [...this.attendanceDates]
    //     : [new Date(), ...this.attendanceDates];
    // } else {
    //   // Call api lấy dữ liệu
    // }
    // }
  }

  selectSession(date: Date) {
    this.selectedDate = date;
    // this.sessionSelected.emit({ date });

    // const hasAttendance = this.attendanceDates.some((d) =>
    //   isSameDay(new Date(d), date),
    // );

    // if (!hasAttendance) {
    //   // hôm nay chưa điểm danh
    //   // this.attendanceData = null;
    //   return;
    // }

    // this.callAttendanceApi(date);
  }

  get sessions(): Date[] {
    // console.log(this.sessionDates)
    return this.sessionDates || [];
  }
}

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AttendanceSidebar } from './attendance-sidebar/attendance-sidebar';
import { AttendanceMain } from './attendance-main/attendance-main';
import { SpinnerComponent } from '../spinner/spinner.component';
import { isSameDay } from '../../../utils/date-util';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AttendanceService } from '../../_service/attendance/attendance.service';
import { initData } from '../../../utils/init-data';
import { DatePipe } from '@angular/common';
import { sortLastName } from '../../../utils/sort-util';
import { BaseComponent } from '../components/base/base-component';

@Component({
  selector: 'app-class-attendance',
  imports: [AttendanceSidebar, AttendanceMain, SpinnerComponent, RouterLink],
  templateUrl: './class-attendance.html',
  styleUrl: './class-attendance.css',
  providers: [DatePipe],
})
export class ClassAttendance implements OnInit, OnChanges, OnDestroy {
  @Input()
  sessionDateResponse?: SessionDateResponse;

  sessionDates: Date[] = []; // để render sidebar
  today = new Date();

  isTeacher: boolean = true;

  protected queryParamsSubscription!: Subscription;
  protected lesson?: string;
  protected session?: string;
  protected data: AttendanceRowResponse[] = [];
  protected enrollments: AttendanceEnrollmentResponse[] = [];
  protected classSlug?: string;

  selectedDate: Date = new Date(); // Thay vì dùng getter

  constructor(
    private readonly route: ActivatedRoute,
    private readonly attendanceService: AttendanceService,
    private readonly datePipe: DatePipe,
    private readonly base: BaseComponent
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sessionDateResponse']) {
      this.buildSessionDates();
      this.handleAttendance();
    }
  }

  private handleAttendance(): void {
    // debugger;
    if (!this.classSlug || !this.session) {
      return;
    }

    if (this.sessionDates && this.sessionDates.length > 0) {
      const hasAttendanceToday = this.attendanceDates.some((date) =>
        isSameDay(date, this.today),
      );

      // Không phải hôm nay
      if (!isSameDay(this.session, this.today)) {
        this.initAttendanceData(this.classSlug, this.session);
        return;
      }

      // Là hôm nay nhưng chưa điểm danh
      if (!hasAttendanceToday) {
        this.initAttendanceEnrollmentData(this.classSlug);
        return;
      }

      // Là hôm nay và đã điểm danh
      this.initAttendanceData(this.classSlug, this.session);
    }
  }

  ngOnInit(): void {
    // if (changes['sessionDateResponse']) {
    this.isTeacher = this.base.isTeacher();
    const slug = this.route.snapshot.paramMap.get('class-slug');
    if (!slug) {
      return;
    }

    this.classSlug = slug;

    // console.log(this.attendanceDates);
    // const hasAttendanceToday = this.attendanceDates?.some((date) =>
    //   isSameDay(new Date(date), this.today),
    // );

    // this.sessionDates = hasAttendanceToday
    //   ? [...this.attendanceDates]
    //   : [new Date(), ...this.attendanceDates];

    // Bắt route lấy lesson và session
    // Nếu như hôm nay thì gọi hàm trên
    // - Nếu như chưa điểm danh thì truyền vào cho child ẩn nút lưu và hủy và khóa form
    // - Nếu điểm danh rồi mà chưa quá 24h thì chưa khóa form
    // Không thì gọi hàm lấy dữ liệu
    // - Nếu điểm danh rồi mà chưa quá 24h thì chưa khóa form

    // Bắt route lấy lesson và session
    // this.queryParamsSubscription = this.route.queryParams.subscribe(
    //   (params) => {
    //     const lesson = params['lesson'] || '';
    //     const session = params['session'] || '';
    //     const sessionDate = session
    //       ? session
    //       : this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    //     this.lesson = lesson;
    //     this.session = session;

    //     // Không phải hôm nay
    //     if (!isSameDay(new Date(sessionDate), this.today)) {
    //       this.initAttendanceData(slug, sessionDate);
    //       return;
    //     }

    //     // Là hôm nay nhưng chưa điểm danh
    //     if (!hasAttendanceToday) {
    //       this.initAttendanceEnrollmentData(slug);
    //       console.log('???');
    //       return;
    //     }

    //     // Là hôm nay nhưng đã điểm danh
    //     this.initAttendanceData(slug, sessionDate);
    //     return;
    //   },
    // );

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.lesson = params['lesson'] || '';

        this.session =
          params['session'] ||
          this.datePipe.transform(new Date(), 'yyyy-MM-dd') ||
          '';

        // Cập nhật selectedDate tại đây để giữ nguyên tham chiếu khi giá trị không đổi
        this.selectedDate = this.session ? new Date(this.session) : this.today;

        this.handleAttendance();
      },
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  private buildSessionDates(): void {
    const attendanceDates = this.attendanceDates || [];

    const hasAttendanceToday = attendanceDates.some((date) =>
      isSameDay(new Date(date), this.today),
    );

    this.sessionDates = hasAttendanceToday
      ? [...attendanceDates]
      : [new Date(), ...attendanceDates];
  }

  initAttendanceData(classSlug: string, sessionDate: string) {
    initData<AttendanceRowResponse[]>(
      this.attendanceService.getAttendanceRows(classSlug, sessionDate),
      (data) => {
        console.log(data);
        if (!this.lesson) {
          this.lesson = (this.data?.length || 0) + '';
        }
        this.data = sortLastName(data);
        this.enrollments = [];
      },
    );
  }

  initAttendanceEnrollmentData(classSlug: string) {
    initData<AttendanceEnrollmentResponse[]>(
      this.attendanceService.getEnrollmentByClassSlug(classSlug),
      (data) => {
        console.log(data);
        this.enrollments = data;
        this.data = [];
      },
    );
  }

  onAddAttendances($event: { attendances: AttendanceRowResponse[] }) {
    this.enrollments = [];
    this.data = $event.attendances || [];
  }

  // ngày đã điểm danh thật
  get attendanceDates(): Date[] {
    return this.sessionDateResponse?.sessionDates || [];
  }

  get attendanceRows(): AttendanceRowResponse[] {
    return this.data;
  }
}

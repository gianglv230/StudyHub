import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BaseComponent } from '../../components/base/base-component';
import { AttendanceService } from '../../../_service/attendance/attendance.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-attendance-main',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './attendance-main.html',
  styleUrl: './attendance-main.css',
})
export class AttendanceMain implements OnChanges {
  @Input() lesson?: string = '1';
  @Input() classSlug?: string;
  @Input() selectedDate?: Date;
  @Input() attendanceRows: AttendanceRowResponse[] = [];
  @Input() enrollmentRows: AttendanceEnrollmentResponse[] = [];
  @Output() addAttendanceEmit = new EventEmitter<{
    attendances: AttendanceRowResponse[];
  }>();

  addAttendanceForm!: FormGroup;
  updateAttendanceForm!: FormGroup;
  initialAttendanceValues: any[] = [];
  isAddSubmitting = false;
  isUpdateSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly base: BaseComponent,
    private readonly attendanceService: AttendanceService,
  ) {
    this.addAttendanceForm = this.fb.group({
      attendances: this.fb.array([]),
    });
    this.updateAttendanceForm = this.fb.group({
      attendances: this.fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['enrollmentRows']) {
      // console.log('DB1: ', this.enrollmentsRowsData);
      this.initForm();
    }
    if (changes['attendanceRows'] || changes['selectedDate']) {
      // console.log('DB2: ', this.attendanceRowsData);
      this.initFormUpdateAttendance();
    }
  }

  // Tách từ cuối để so sánh
  private getLastWord(name: string): string {
    if (!name) return '';
    const trimmed = name.trim();
    return trimmed.substring(trimmed.lastIndexOf(' ') + 1);
  }

  // *** SORT ***
  // Hàm so sánh dùng chung cho cả 2 mảng
  private compareStudentNames(fullNameA: string, fullNameB: string): number {
    const nameA = this.getLastWord(fullNameA);
    const nameB = this.getLastWord(fullNameB);

    // 1. So sánh tên chính (từ cuối cùng)
    const nameComparison = nameA.localeCompare(nameB, 'vi', {
      sensitivity: 'base',
    });

    // 2. Nếu tên chính khác nhau, trả về kết quả luôn
    if (nameComparison !== 0) {
      return nameComparison;
    }

    // 3. Nếu trùng tên chính, tiến hành so sánh toàn bộ họ và tên
    return fullNameA
      .trim()
      .localeCompare(fullNameB.trim(), 'vi', { sensitivity: 'base' });
  }

  // Sắp xếp mảng attendanceRows
  private sortAttendanceRows(): void {
    this.attendanceRows.sort((a, b) =>
      this.compareStudentNames(a.studentName, b.studentName),
    );
  }

  // Sắp xếp mảng enrollmentRows
  private sortEnrollmentRows(): void {
    this.enrollmentRows.sort((a, b) =>
      this.compareStudentNames(a.studentName, b.studentName),
    );
  }
  // *** END SORT ***

  // Add Attendance
  initForm() {
    const formArray = this.attendanceArray;

    formArray.clear();

    this.sortEnrollmentRows();
    this.enrollmentsRowsData?.forEach((item) => {
      formArray.push(
        this.fb.group({
          enrollmentId: [item.enrollmentId],

          // checkbox
          isPresent: [false],

          // note
          note: [''],
        }),
      );
    });

    this.initialAttendanceValues = this.attendanceArray.getRawValue();
  }

  get attendanceArray(): FormArray {
    return this.addAttendanceForm?.get('attendances') as FormArray;
  }

  cancelAdd() {
    this.attendanceArray.reset(this.initialAttendanceValues);

    this.addAttendanceForm.markAsPristine();
    this.addAttendanceForm.markAsUntouched();
  }

  submitAdd() {
    const payload: AddAttendanceRequest[] = this.attendanceArray.value.map(
      (item: any) => ({
        enrollmentId: item.enrollmentId,

        // convert checkbox -> status
        status: item.isPresent ? 'PRESENT' : 'ABSENT',

        note: item.note,
      }),
    );

    console.log(payload);

    this.isAddSubmitting = true;

    // call api
    this.attendanceService
      .addAttendance(this.classSlug || '', payload)
      .pipe(finalize(() => (this.isAddSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.addAttendanceEmit.emit({ attendances: res.data });
            this.base.showSuccess('Cập nhật thông tin thành công');
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isAddSubmitting = false),
      });
    // this.attendanceService.addAttendance(payload).subscribe(...)
    // this.addAttendance.emit({date: this.selectedDate!});
  }

  get attendanceControls() {
    return this.attendanceArray.controls;
  }

  // Count for add attendance
  get totalEnrollment() {
    return this.enrollmentRows?.length || 0;
  }

  get totalPresentEnrollment(): number {
    return this.attendanceArray.value.filter((item: any) => item.isPresent)
      .length;
  }

  // UPDATE
  // Add Attendance
  initFormUpdateAttendance() {
    const formArray = this.updateAttendanceArray;

    formArray.clear();

    this.sortAttendanceRows();
    this.attendanceRowsData?.forEach((item) => {
      formArray.push(
        this.fb.group({
          id: [item.id],

          // checkbox
          isPresent: [item.status == 'PRESENT'],

          // note
          note: [item.note],
        }),
      );
    });

    if (!this.isEdited) {
      formArray.disable();
    } else {
      formArray.enable(); // Cần phải gọi enable() để kích hoạt lại form
    }

    this.initialAttendanceValues = this.updateAttendanceArray.getRawValue();
  }

  get updateAttendanceArray(): FormArray {
    return this.updateAttendanceForm?.get('attendances') as FormArray;
  }

  cancelUpdate() {
    this.updateAttendanceArray.reset(this.initialAttendanceValues);

    this.updateAttendanceArray.markAsPristine();
    this.updateAttendanceArray.markAsUntouched();
  }

  // UNIMPL
  submitUpdate() {
    const payload: UpdateAttendanceRequest[] =
      this.updateAttendanceArray.value.map((item: any) => ({
        id: item.id,

        // convert checkbox -> status
        status: item.isPresent ? 'PRESENT' : 'ABSENT',

        note: item.note,
      }));

    console.log(payload);

    this.isUpdateSubmitting = true;

    // call api
    this.attendanceService
      .updateAttendance(this.classSlug || '', payload)
      .pipe(finalize(() => (this.isUpdateSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.addAttendanceEmit.emit({ attendances: res.data });
            this.base.showSuccess('Cập nhật thông tin thành công');
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isUpdateSubmitting = false),
      });
    // this.attendanceService.addAttendance(payload).subscribe(...)
    // this.addAttendance.emit({date: this.selectedDate!});
  }

  get updateAttendanceControls() {
    return this.updateAttendanceArray.controls;
  }

  // Count for update attendance
  get totalPresent(): number {
    return this.updateAttendanceArray.value.filter(
      (item: any) => item.isPresent,
    ).length;
  }

  get totalAttendance(): number {
    return this.attendanceRows?.length || 0;
  }

  get enrollmentsRowsData(): AttendanceEnrollmentResponse[] {
    return this.enrollmentRows || [];
  }

  get attendanceRowsData(): AttendanceRowResponse[] {
    return this.attendanceRows || [];
  }

  // Edit permission
  get isEdited(): boolean {
    if (!this.selectedDate) {
      return false;
    }

    // Admin
    if (this.base.isAdmin()) {
      return true;
    }

    const now = new Date();
    const selected = new Date(this.selectedDate);

    const diffMs = now.getTime() - selected.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours <= 24;
  }

  empty() {
    console.log('EMPTY');
  }
}

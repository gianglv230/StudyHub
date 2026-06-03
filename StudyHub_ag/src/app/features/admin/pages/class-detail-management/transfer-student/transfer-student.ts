import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormSelect } from '../../../../../_shared/components/form-select/form-select';
import {
  InvoiceMethodOptions,
  InvoiceStatusLiteOptions,
} from '../../../../../../utils/const/status.const';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../../_service/utils/token';
import { AdminEnrollmentService } from '../../../service/admin-enrollment/admin-enrollment.service';
import { AdminClassService } from '../../../service/admin-class/admin-class.service';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';
import { initData } from '../../../../../../utils/init-data';

@Component({
  selector: 'app-transfer-student',
  imports: [ReactiveFormsModule, FormInput, DatePipe, FormSelect, DecimalPipe],
  templateUrl: './transfer-student.html',
  styleUrl: './transfer-student.css',
})
export class TransferStudent {
  isSubmitting = false;
  form?: FormGroup;
  cboxInvoiceStatus: ComboboxRow[] = InvoiceStatusLiteOptions;
  cboxInvoiceMethod: ComboboxRow[] = InvoiceMethodOptions;
  class?: AdminClassInfoResponse;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA)
    public data: {
      class: AdminClassInfoResponse;
      student: StudentInClassResponse;
    },
    private readonly fb: FormBuilder,
    private readonly classService: AdminClassService,
    private readonly enrollmentService: AdminEnrollmentService,
    private readonly base: BaseComponent,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [null, Validators.required], // Tự động tính
      adjustments: [0],
      method: [null],
      studentId: [this.data.student.id],
      enrollmentId: [this.data.student.enrollmentId],
      newClassSlug: [null, Validators.required], // Nhập
      status: ['PENDING'],
      dueDate: [null, Validators.required], // Tự động tính
    });
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  calculateDate(openingDate: Date) {
    // 1. Tạo đối tượng Date mới từ openingDate để tránh làm thay đổi data gốc
    const calculatedDate = new Date(openingDate);
    // 2. Trừ đi 3 ngày
    calculatedDate.setDate(calculatedDate.getDate() - 3);

    return calculatedDate;
  }

  getClassInfo() {
    if (this.form) {
      const classSlug = this.getControl(this.form, 'newClassSlug').value;
      initData<AdminClassInfoResponse>(
        this.classService.getAdminClassInfo(classSlug),
        (data) => {
          console.log(data);
          this.class = data;
          const priceDifference = data.price - this.data.class.price;
          this.getControl(this.form, 'amount').setValue(
            Math.max(priceDifference, 0),
          );
          this.getControl(this.form, 'dueDate').setValue(
            this.calculateDate(this.class.openingDate),
          );
        },
      );
    }
  }

  onSubmit() {
    if (!this.form || !this.class) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    if (this.getControl(this.form, 'status').value != 'PAID') {
      this.getControl(this.form, 'method').setValue(null);
    }

    const payload = this.form.getRawValue();

    console.log(payload);

    this.enrollmentService
      .transferStudent(payload)
      // .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã chuyển lớp học viên');
            this.activeModal.close();
            this.enrollmentService.triggerRefreshStudentClass();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

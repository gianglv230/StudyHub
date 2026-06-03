import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../../_service/utils/token';
import { AdminEnrollmentService } from '../../../service/admin-enrollment/admin-enrollment.service';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';
import {
  InvoiceMethodOptions,
  InvoiceStatusLiteOptions,
} from '../../../../../../utils/const/status.const';
import { initData } from '../../../../../../utils/init-data';
import { AdminUserAccountService } from '../../../service/admin-user-account/admin-user-account.service';
import { DatePipe } from '@angular/common';
import { FormSelect } from '../../../../../_shared/components/form-select/form-select';

@Component({
  selector: 'app-add-enrollment',
  imports: [ReactiveFormsModule, FormInput, DatePipe, FormSelect],
  templateUrl: './add-enrollment.html',
  styleUrl: './add-enrollment.css',
})
export class AddEnrollment implements OnInit {
  isSubmitting = false;
  form?: FormGroup;
  cboxInvoiceStatus: ComboboxRow[] = InvoiceStatusLiteOptions;
  cboxInvoiceMethod: ComboboxRow[] = InvoiceMethodOptions;
  student?: AdminUserAccountBasicResponse;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA)
    public data: { classSlug: string; price: number; openingDate: Date },
    private readonly fb: FormBuilder,
    private readonly userAccountService: AdminUserAccountService,
    private readonly enrollmentService: AdminEnrollmentService,
    private readonly base: BaseComponent,
  ) {}

  ngOnInit(): void {
    // 1. Tạo đối tượng Date mới từ openingDate để tránh làm thay đổi data gốc
    const calculatedDate = new Date(this.data.openingDate);
    // 2. Trừ đi 3 ngày
    calculatedDate.setDate(calculatedDate.getDate() - 3);

    this.form = this.fb.group({
      amount: [this.data.price],
      adjustments: [0],
      method: [null],
      studentId: [null, Validators.required],
      classSlug: [this.data.classSlug],
      status: ['PENDING'],
      dueDate: [calculatedDate],
    });
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  getStudentInfo() {
    if (this.form) {
      const id = this.getControl(this.form, 'studentId').value;
      initData<AdminUserAccountBasicResponse>(
        this.userAccountService.getUserAccount(id),
        (data) => {
          console.log(data);
          this.student = data;
        },
      );
    }
  }

  onSubmit() {
    if (!this.form) return;

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
      .addStudent(payload)
      // .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã thêm học viên');
            this.activeModal.close();
            this.enrollmentService.triggerRefreshStudentClass();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

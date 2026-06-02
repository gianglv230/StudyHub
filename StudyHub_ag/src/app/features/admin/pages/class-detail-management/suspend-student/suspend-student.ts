import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../../_service/utils/token';
import { AdminEnrollmentService } from '../../../service/admin-enrollment/admin-enrollment.service';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';

@Component({
  selector: 'app-suspend-student',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './suspend-student.html',
  styleUrl: './suspend-student.css',
})
export class SuspendStudent {
  isSubmitting = false;
  form?: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA)
    public data: { student: StudentInClassResponse; price: number },
    private readonly fb: FormBuilder,
    private readonly enrollmentService: AdminEnrollmentService,
    private readonly base: BaseComponent,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      amount: [this.data.price],
      adjustments: [-1 * this.data.price],
      method: ['BANK'],
      enrollmentId: [this.data.student.enrollmentId],
    });
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  onSubmit() {
    if (!this.form) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = this.form.getRawValue();

    console.log(payload);

    this.enrollmentService
      .suspendStudent(payload)
      // .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã đình chỉ học viên');
            this.activeModal.close();
            this.enrollmentService.triggerRefreshStudentClass();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../../_service/utils/token';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';
import { TeacherClcService } from '../../../service/teacher-clc/teacher-clc.service';
import { FormInput } from "../../../../../_shared/components/form-input/form-input";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-add-lesson',
  imports: [ReactiveFormsModule, FormInput, RouterLink],
  templateUrl: './add-lesson.html',
  styleUrl: './add-lesson.css',
})
export class AddLesson {
  isSubmitting = false;
  form?: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA)
    public data: { classSlug: string; orderIndex: number },
    private readonly fb: FormBuilder,
    private readonly clcService: TeacherClcService,
    private readonly base: BaseComponent,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      classSlug: [this.data.classSlug],
      classLessonSlug: ['', Validators.required],
      orderIndex: [this.data.orderIndex],
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

    this.clcService
      .create(payload)
      // .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã thêm bài học');
            this.activeModal.close();
            this.clcService.triggerRefreshClassLesson();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

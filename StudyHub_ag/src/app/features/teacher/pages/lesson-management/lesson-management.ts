import { Component, OnInit } from '@angular/core';
import { LessonFormAction } from './lesson-form-action/lesson-form-action';
import { LessonForm } from './lesson-form/lesson-form';
import { ClassLessonService } from '../../../../_service/class-lesson/class-lesson.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { initData } from '../../../../../utils/init-data';
import { TeacherClassLessonService } from '../../service/teacher-class-lesson/teacher-class-lesson.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { validateRange } from '../../../../../utils/validator/factory.validator';
import { BaseComponent } from '../../../../_shared/components/base/base-component';

@Component({
  selector: 'app-lesson-management',
  imports: [LessonFormAction, LessonForm, RouterLink],
  templateUrl: './lesson-management.html',
  styleUrl: './lesson-management.css',
})
export class LessonManagement implements OnInit {
  classLesson?: ClassLessonTeacherResponse;
  isAdd: boolean = true;

  form?: FormGroup;
  classSlug?: string | null;
  classLessonSlug?: string | null;

  // Lưu nguyên bản một bản sao FormGroup độc lập tại đây
  initialForm?: FormGroup;

  constructor(
    private readonly classLessonService: TeacherClassLessonService,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly base: BaseComponent,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.classSlug = this.route.snapshot.paramMap.get('class-slug');
    this.classLessonSlug =
      this.route.snapshot.paramMap.get('class-lesson-slug');

    if (this.classSlug && this.classLessonSlug) {
      this.isAdd = false;
      this.form = this.fb.group({
        id: [null],
        slug: ['', Validators.required],
        titleOverride: ['', [Validators.required, validateRange(10, 255)]],
        sections: this.fb.array([]),
      });

      initData<ClassLessonTeacherResponse>(
        this.classLessonService.getClassLesson(
          this.classSlug,
          this.classLessonSlug,
        ),
        (data) => {
          console.log(data);
          this.classLesson = data;
          this.populateForm(data);

          // Deep clone lại FormGroup sau khi đã populate dữ liệu thành công
          if (this.form) {
            this.initialForm = this.cloneFormGroup(this.form);
          }
        },
      );
      return;
    }

    if (this.classSlug) {
      this.isAdd = true;
      this.form = this.fb.group({
        id: [null],
        slug: ['', Validators.required],
        titleOverride: ['', [Validators.required, validateRange(10, 255)]],
        sections: this.fb.array([
          this.fb.group({
            id: [null],
            sectionName: ['', [Validators.required, validateRange(8, 255)]],
            orderIndex: [1, [Validators.required]],
            description: [''],
            videoContentId: [null],
            videoResource: this.fb.control<ChildrenResourceResponse | null>(null),
            textContent: [null],
            type: ['VIDEO_MAIN', [Validators.required]],
            materials: this.fb.control<ChildrenResourceResponse[]>([]),
          }),
        ]),
      });

      // Deep clone lại FormGroup sau khi đã populate dữ liệu thành công
      if (this.form) {
        this.initialForm = this.cloneFormGroup(this.form);
      }
      return;
    }
  }

  populateForm(data: ClassLessonTeacherResponse) {
    if (!this.form) return;

    this.form.patchValue({
      id: data.id,
      slug: data.slug,
      titleOverride: data.titleOverride || '',
    });

    const sectionsArray = this.form.get('sections') as FormArray<any>;
    sectionsArray.clear();

    // Sắp xếp sections theo orderIndex trước khi đẩy vào form
    const sortedSections = [...(data.sections || [])].sort(
      (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
    );

    sortedSections.forEach((sec: any) => {
      sectionsArray.push(
        this.fb.group({
          id: [sec.id],
          sectionName: [
            sec.sectionName,
            [Validators.required, validateRange(8, 255)],
          ],
          orderIndex: [sec.orderIndex, [Validators.required]],
          description: [sec.description || ''],
          videoContentId: [sec.videoContent ? sec.videoContent.id : null],
          videoResource: this.fb.control<ChildrenResourceResponse | null>(
            sec.videoContent || null,
          ),
          textContent: [sec.textContent || null],
          type: [sec.type || 'VIDEO_MAIN', [Validators.required]],
          materials:
            this.fb.control<ChildrenResourceResponse[]>(sec.materials || []),
        }) as any,
      );
    });
  }

  onSubmit($event: any) {
    if (this.isAdd) {
      this.addClassLesson();
    } else {
      this.updateClassLesson();
    }
  }

  addClassLesson() {
    console.log(this.buildAddRequest());

    if (!this.buildAddRequest()) return;

    this.classLessonService
      .addClassLesson(this.classSlug!, this.buildAddRequest()!)
      .subscribe({
        next: (res) => {
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Thêm bài học thành công');
            this.router.navigate([
              `/giao-vien/lop-hoc/${this.classSlug}/quan-ly-bai-hoc/${res.data}`,
            ]);
          }
        },
        error: (err) => this.base.handleError(err),
      });
  }

  updateClassLesson() {
    console.log(this.buildAddRequest());
    
    if (!this.buildAddRequest()) return;

    this.classLessonService
      .updateClassLesson(this.classSlug!, this.buildAddRequest()!)
      .subscribe({
        next: (res) => {
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Cập nhật bài học thành công');
            this.router.navigate([
              `/giao-vien/lop-hoc/${this.classSlug}/quan-ly-bai-hoc/${res.data}`,
            ]);
          }
        },
        error: (err) => this.base.handleError(err),
      });
  }

  buildAddRequest(): ClassLessonTeacherRequest | null {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    const raw = this.form!.getRawValue();
    raw.sections.forEach((sec: any, secIdx: number) => {
      sec.orderIndex = secIdx + 1;
      if (sec.materials) {
        sec.materials = sec.materials.map((m: any) =>
          typeof m === 'object' && m ? m.id : m,
        );
      } else {
        sec.materials = [];
      }
      delete sec.videoResource;
    });
    return raw;
  }

  // Hàm hoán đổi/khôi phục lại form gốc khi bấm Cancel
  onCancel($event: any) {
    if (this.initialForm) {
      // Gán lại form hiện tại bằng một bản sao mới từ bản lưu trữ ban đầu
      // Điều này giúp "cắt đứt" mọi thay đổi mà user đã nhập trên giao diện
      this.form = this.cloneFormGroup(this.initialForm);
    }
  }

  /**
   * Hàm Deep Clone FormGroup chuyên dụng cho Angular
   * Hỗ trợ nhân bản chính xác cấu trúc FormGroup, FormArray, FormControl và các Validators đi kèm.
   */
  private cloneFormGroup(formGroup: FormGroup): FormGroup {
    const clonedGroup = this.fb.group({});

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control instanceof FormGroup) {
        clonedGroup.addControl(key, this.cloneFormGroup(control));
      } else if (control instanceof FormArray) {
        clonedGroup.addControl(key, this.cloneFormArray(control));
      } else if (control instanceof FormControl) {
        clonedGroup.addControl(
          key,
          new FormControl(
            control.value,
            control.validator,
            control.asyncValidator,
          ),
        );
      }
    });

    return clonedGroup;
  }

  /**
   * Hàm đệ quy hỗ trợ sao chép các FormArray phức tạp lồng nhau
   */
  private cloneFormArray(formArray: FormArray): FormArray {
    const clonedArray = this.fb.array([]);

    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        clonedArray.push(this.cloneFormGroup(control) as any);
      } else if (control instanceof FormArray) {
        clonedArray.push(this.cloneFormArray(control) as any);
      } else if (control instanceof FormControl) {
        clonedArray.push(
          new FormControl(
            control.value,
            control.validator,
            control.asyncValidator,
          ),
        );
      }
    });

    return clonedArray;
  }

}

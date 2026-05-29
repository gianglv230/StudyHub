import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AdminCourseService } from '../../service/admin-course-service/admin-course.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../_shared/components/base/base-component';
import { validateRange } from '../../../../../utils/validator/factory.validator';
import { FormInput } from '../../../../_shared/components/form-input/form-input';
import { Subscription } from 'rxjs';
import { toSlug } from '../../../../../utils/slug.util';
import { DatePipe } from '@angular/common';
import { FormSelect } from '../../../../_shared/components/form-select/form-select';
import { CourseStatusMap } from '../../../../../utils/const/status.const';
import { ResourceLiteCard } from '../../../../_shared/resource-lite-card/resource-lite-card';
import { ModalService } from '../../../../_service/utils/modal.service';
import { ResourceModal } from '../../../../_shared/resource-modal/resource-modal';

@Component({
  selector: 'app-course-form',
  imports: [
    ReactiveFormsModule,
    FormInput,
    DatePipe,
    FormSelect,
    ResourceLiteCard,
  ],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit, OnDestroy {
  isAdd: boolean = true;
  form?: FormGroup;

  courseSlug?: string | null;

  // Lưu nguyên bản một bản sao FormGroup độc lập tại đây
  initialForm?: FormGroup;

  private titleSub?: Subscription;
  courseResponse?: AdminCourseResponse;
  statusData: ComboboxRow[] = [];

  constructor(
    private readonly courseSerivce: AdminCourseService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly base: BaseComponent,
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.courseSlug = this.route.snapshot.paramMap.get('course-slug');

    this.statusData = Object.entries(CourseStatusMap).map(([value, label]) => ({
      label,
      value,
    }));

    if (this.courseSlug) {
      this.isAdd = false;
      return;
    }

    this.isAdd = true;
    this.form = this.fb.group({
      id: [null],
      title: ['', [Validators.required, validateRange(8, 255)]],
      slug: ['', Validators.required],
      description: [''],
      categoryName: ['', [Validators.required, validateRange(2, 255)]],
      targetGrade: ['', [Validators.required, validateRange(3, 255)]],
      subject: ['', [Validators.required, validateRange(2, 255)]],
      thumbnailId: [null],
      thumbnail: this.fb.control<ChildrenResourceResponse | null>(null),
      videoId: [null],
      video: this.fb.control<ChildrenResourceResponse | null>(null),
      numberOfLessons: [0],
      status: ['ACTIVE', [Validators.required]],
      lessons: this.fb.array([
        this.fb.group({
          title: [''],
          orderIndex: [1],
        }),
      ]),
    });
    // Deep clone lại FormGroup sau khi đã populate dữ liệu thành công
    if (this.form) {
      this.initialForm = this.cloneFormGroup(this.form);
      this.subscribeToTitleChanges();
    }
  }

  private subscribeToTitleChanges(): void {
    this.titleSub?.unsubscribe();
    if (!this.form) return;

    this.titleSub = this.form
      .get('title')
      ?.valueChanges.subscribe((value: string) => {
        const slugControl = this.form?.get('slug');
        if (slugControl) {
          slugControl.setValue(toSlug(value || ''), { emitEvent: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.titleSub?.unsubscribe();
  }

  addLesson() {
    if (!this.form) return;
    const array = this.form.get('lessons') as FormArray;
    const orderIndex = array.length + 1;

    const newLesson = this.fb.group({
      title: [''],
      orderIndex: [orderIndex],
    });

    array.push(newLesson);
    this.recalculateOrderIndices();
    this.syncNumberOfLessons();
  }

  removeLesson(lesIdx: number) {
    if (!this.form) return;
    const array = this.form.get('lessons') as FormArray;
    array.removeAt(lesIdx);
    this.recalculateOrderIndices();
    this.syncNumberOfLessons();
  }

  private syncNumberOfLessons(): void {
    if (!this.form) return;
    const count = (this.form.get('lessons') as FormArray).length;
    this.form.get('numberOfLessons')?.setValue(count, { emitEvent: false });
  }

  //UNIMPL
  populateForm(data: AdminCourseResponse) {}

  getLessons(): FormGroup[] {
    return (
      ((this.form?.get('lessons') as FormArray)?.controls as FormGroup[]) || []
    );
  }

  moveUp(idx: number) {
    if (idx === 0) return;
    const array = this.form?.get('lessons') as FormArray;
    const current = array.at(idx);
    array.removeAt(idx);
    array.insert(idx - 1, current);
    this.recalculateOrderIndices();
  }

  moveDown(idx: number) {
    const array = this.form?.get('lessons') as FormArray;
    if (idx === array.length - 1) return;
    const current = array.at(idx);
    array.removeAt(idx);
    array.insert(idx + 1, current);
    this.recalculateOrderIndices();
  }

  recalculateOrderIndices() {
    if (!this.form) return;
    const array = this.form.get('lessons') as FormArray;

    array.controls.forEach((secControl, secIdx) => {
      secControl.get('orderIndex')?.setValue(secIdx + 1);
    });
  }

  openResourceModal(
    form: FormGroup,
    mode: 'single' | 'multiple' = 'single',
    kind: 'thumbnail' | 'video',
  ) {
    this.modalService
      .open({
        component: ResourceModal,
        size: 'xl',
        data: { selectionMode: mode },
      })
      .subscribe((resources) => {
        if (resources) {
          const res = Array.isArray(resources) ? resources[0] : resources;
          if (kind == 'video') {
            form.get('videoId')?.setValue(res.id);
            form.get('video')?.setValue(res);
          } else {
            form.get('thumbnailId')?.setValue(res.id);
            form.get('thumbnail')?.setValue(res);
          }
        }
      });
  }

  removeThumbnailResource(section: FormGroup) {
    section.get('thumbnailId')?.setValue(null);
    section.get('thumbnail')?.setValue(null);
  }

  removeVideoResource(section: FormGroup) {
    section.get('videoId')?.setValue(null);
    section.get('video')?.setValue(null);
  }

  addCourse() {
    const request = this.buildAddRequest();
    if (!request) {
      const logInvalidControls = (group: FormGroup | FormArray, prefix = '') => {
        const entries: Array<[string, any]> =
          group instanceof FormArray
            ? group.controls.map((ctrl, i) => [String(i), ctrl])
            : Object.entries((group as FormGroup).controls);
        entries.forEach(([key, ctrl]) => {
          const path = prefix ? `${prefix}.${key}` : key;
          if (ctrl instanceof FormGroup || ctrl instanceof FormArray) {
            logInvalidControls(ctrl, path);
          } else if (ctrl.invalid) {
            console.log(`  [invalid] ${path}:`, ctrl.errors, '| value:', ctrl.value);
          }
        });
      };
      console.warn('[addCourse] Form invalid — chi tiết:');
      if (this.form) logInvalidControls(this.form);
      return;
    }
    console.log('[addCourse] Request payload:', request);

    this.courseSerivce.addCourse(request).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Thêm khóa học thành công');
          // this.router.navigate([
          //   `/admin/quan-ly-khoa-hoc/bieu-mau/${res.data}`,
          // ]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }

  updateCourse() {}

  buildUpdateRequest(): AddCourseRequest | null {
    return this.buildRequest<AddCourseRequest>();
  }

  buildAddRequest(): AddCourseRequest | null {
    return this.buildRequest<AddCourseRequest>();
  }

  buildRequest<T>(): T | null {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    const raw = this.form!.getRawValue();

    // Lọc bỏ các lesson chưa nhập tiêu đề (dự kiến chưa hoàn chỉnh)
    raw.lessons = raw.lessons
      .filter((les: any) => !!les.title?.trim())
      .map((les: any, lesIdx: number) => {
        les.orderIndex = lesIdx + 1;
        return les;
      });

    // Đồng bộ lại numberOfLessons theo số lesson thực tế gửi lên
    raw.numberOfLessons = raw.lessons.length;

    // Xóa các trường object chỉ dùng để hiển thị UI, không gửi lên API
    delete raw.thumbnail;
    delete raw.video;

    return raw;
  }

  onSubmit() {
    if (this.isAdd) {
      this.addCourse();
    } else {
      this.updateCourse();
    }
  }

  // Slug
  get slugPreview(): string {
    return this.form?.get('slug')?.value || '';
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  // Hàm hoán đổi/khôi phục lại form gốc khi bấm Cancel
  onCancel() {
    if (this.initialForm) {
      // Gán lại form hiện tại bằng một bản sao mới từ bản lưu trữ ban đầu
      // Điều này giúp "cắt đứt" mọi thay đổi mà user đã nhập trên giao diện
      this.form = this.cloneFormGroup(this.initialForm);
      this.subscribeToTitleChanges();
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { toSlug } from '../../../../../utils/slug.util';
import { AdminClassService } from '../../service/admin-class.service.ts/admin-class.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../../_shared/components/base/base-component';
import { ModalService } from '../../../../_service/utils/modal.service';
import { initData } from '../../../../../utils/init-data';
import {
  dateLessThanValidator,
  validateRange,
} from '../../../../../utils/validator/factory.validator';
import { ResourceModal } from '../../../../_shared/resource-modal/resource-modal';
import { DatePipe } from '@angular/common';
import { FormInput } from '../../../../_shared/components/form-input/form-input';
import { FormSelect } from '../../../../_shared/components/form-select/form-select';
import { ResourceLiteCard } from '../../../../_shared/resource-lite-card/resource-lite-card';

@Component({
  selector: 'app-class-form',
  imports: [
    ReactiveFormsModule,
    DatePipe,
    FormInput,
    FormSelect,
    ResourceLiteCard,
  ],
  templateUrl: './class-form.html',
  styleUrl: './class-form.css',
})
export class ClassForm implements OnInit, OnDestroy {
  isAdd: boolean = true;
  form?: FormGroup;

  courseSlug?: string | null;
  classSlug?: string | null;

  // Lưu nguyên bản một bản sao FormGroup độc lập tại đây
  initialForm?: FormGroup;

  private titleSub?: Subscription;
  classResponse?: AdminClassResponse;
  teacherData: ComboboxRow[] = [];

  constructor(
    private readonly classService: AdminClassService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly base: BaseComponent,
    private readonly router: Router,
    private readonly modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.courseSlug = this.route.snapshot.paramMap.get('course-slug');
    this.classSlug = this.route.snapshot.paramMap.get('class-slug');

    initData<TeacherLiteResponse[]>(
      this.classService.getTeacherList(),
      (data) => {
        console.log(data);
        // Giả sử data có kiểu: TeacherLiteResponse[]
        this.teacherData = data.map((teacher: TeacherLiteResponse) => ({
          label: teacher.teacherId + ' - ' + teacher.fullname,
          value: teacher.teacherId, // value giữ id để sau này gửi request lên backend
        }));
      },
    );

    if (this.courseSlug && this.classSlug) {
      this.isAdd = false;
      this.form = this.fb.group(
        {
          id: [null],
          slug: [''],
          teacherId: [, Validators.required],
          className: ['', [Validators.required, validateRange(3, 255)]],
          thumbnailId: [null],
          thumbnail: this.fb.control<ChildrenResourceResponse | null>(null),
          openingDate: [null, Validators.required],
          startDate: [null, Validators.required],
          endDate: [null, Validators.required],
          classSchedule: ['', Validators.required],
          price: [0, Validators.min(50000)],
          maxStudents: [0, Validators.min(1)],
        },
        {
          validators: [
            dateLessThanValidator('openingDate', 'startDate'),
            dateLessThanValidator('startDate', 'endDate'),
          ],
        },
      );

      initData<AdminClassResponse>(
        this.classService.getAdminClass(this.classSlug),
        (data) => {
          console.log(data);
          this.classResponse = data;
          this.populateForm(data);

          // Deep clone lại FormGroup sau khi đã populate dữ liệu thành công
          if (this.form) {
            this.initialForm = this.cloneFormGroup(this.form);
            this.subscribeToTitleChanges();
          }
        },
      );

      return;
    }

    if (this.courseSlug) {
      this.isAdd = true;
      this.form = this.fb.group(
        {
          id: [null],
          slug: [''],
          teacherId: [, Validators.required],
          className: ['', [Validators.required, validateRange(3, 255)]],
          thumbnailId: [null],
          thumbnail: this.fb.control<ChildrenResourceResponse | null>(null),
          openingDate: [null, Validators.required],
          startDate: [null, Validators.required],
          endDate: [null, Validators.required],
          classSchedule: ['', Validators.required],
          price: [0, Validators.min(50000)],
          maxStudents: [0, Validators.min(1)],
          courseSlug: [this.courseSlug],
        },
        {
          validators: [
            dateLessThanValidator('openingDate', 'startDate'),
            dateLessThanValidator('startDate', 'endDate'),
          ],
        },
      );

      // Deep clone lại FormGroup sau khi đã populate dữ liệu thành công
      if (this.form) {
        this.initialForm = this.cloneFormGroup(this.form);
        this.subscribeToTitleChanges();
      }
    }
  }

  populateForm(data: AdminClassResponse) {
    if (!this.form) return;

    this.form.patchValue({
      id: data.id,
      slug: data.slug,
      teacherId: data.teacherId,
      className: data.className,
      thumbnailId: data.thumbnailOverride.id,
      thumbnail: data.thumbnailOverride,
      openingDate: data.openingDate,
      startDate: data.startDate,
      endDate: data.endDate,
      classSchedule: data.classSchedule,
      price: data.price,
      maxStudents: data.maxStudents,
    });
  }

  openResourceModal(
    form: FormGroup,
    mode: 'single' | 'multiple' = 'single',
    // kind: 'thumbnail' | 'video',
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
          // if (kind == 'video') {
          //   form.get('videoId')?.setValue(res.id);
          //   form.get('video')?.setValue(res);
          // } else {
          form.get('thumbnailId')?.setValue(res.id);
          form.get('thumbnail')?.setValue(res);
          // }
        }
      });
  }

  removeThumbnailResource(fg: FormGroup) {
    fg.get('thumbnailId')?.setValue(null);
    fg.get('thumbnail')?.setValue(null);
  }

  buildRequest<T>(): T | null {
    if (this.form?.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    const raw = this.form!.getRawValue();

    // Xóa các trường object chỉ dùng để hiển thị UI, không gửi lên API
    delete raw.thumbnail;

    return raw;
  }

  buildAddRequest(): AddClassRequest | null {
    return this.buildRequest<AddClassRequest>();
  }

  // UNIMPL
  buildUpdateRequest(): UpdateClassRequest | null {
    return this.buildRequest<UpdateClassRequest>();
  }

  addClass() {
    const request = this.buildAddRequest();
    console.log(request);
    if (!request) return;
    this.classService.addClass(request).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Thêm lớp học thành công');
          // this.router.navigate([
          //   `/admin/quan-ly-khoa-hoc/bieu-mau/${res.data}`,
          // ]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }

  updateClass() {
    const request = this.buildUpdateRequest();
    console.log(request);
    if (!request) return;
    this.classService.updateClass(request).subscribe({
      next: (res) => {
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.base.showSuccess('Sửa lớp học thành công');
          // this.router.navigate([
          //   `/admin/quan-ly-khoa-hoc/bieu-mau/${res.data}`,
          // ]);
        }
      },
      error: (err) => this.base.handleError(err),
    });
  }

  onSubmit() {
    if (this.isAdd) {
      this.addClass();
    } else {
      this.updateClass();
    }
  }

  private subscribeToTitleChanges(): void {
    this.titleSub?.unsubscribe();
    if (!this.form) return;

    this.titleSub = this.form
      .get('className')
      ?.valueChanges.subscribe((value: string) => {
        const slugControl = this.form?.get('slug');
        if (slugControl) {
          slugControl.setValue(toSlug(value || ''), { emitEvent: false });
        }
      });
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

  ngOnDestroy(): void {
    this.titleSub?.unsubscribe();
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

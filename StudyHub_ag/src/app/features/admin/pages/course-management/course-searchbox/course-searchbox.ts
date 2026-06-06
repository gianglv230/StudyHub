import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GuestCourseService } from '../../../../guest/service/guest-course/guest-course.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { initData } from '../../../../../../utils/init-data';
import { FormSelect } from '../../../../../_shared/components/form-select/form-select';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { dateLessThanValidator } from '../../../../../../utils/validator/factory.validator';

@Component({
  selector: 'app-course-searchbox',
  imports: [ReactiveFormsModule, FormSelect, FormInput],
  templateUrl: './course-searchbox.html',
  styleUrl: './course-searchbox.css',
})
export class CourseSearchbox implements OnInit {
  form: FormGroup; // Bỏ dấu '?' vì nó đã chắc chắn được khởi tạo trong constructor
  // options?: CourseFilterOptionsResponse;
  cboxSubject: ComboboxRow[] = [];
  cboxCategory: ComboboxRow[] = [];
  cboxTarget: ComboboxRow[] = [];
  cboxStatus: ComboboxRow[] = [];

  // 1. Sửa cú pháp Output: Định nghĩa chuẩn Generic <Kiểu_Dữ_Liệu>
  @Output() filterEvent = new EventEmitter<CourseFilterRequest>();

  constructor(
    private readonly guestCourseService: GuestCourseService,
    private readonly fb: FormBuilder,
  ) {
    this.form = this.fb.group(
      {
        subject: [''],
        targetGrade: [''],
        categoryName: [''],
        status: [''],
        fromDate: [null],
        toDate: [null],
        courseName: [''],
      },
      {
        validators: [dateLessThanValidator('fromDate', 'toDate')],
      },
    );
  }

  // 1. Hàm convert tự động chèn 'Tất cả' vào đầu mảng
  private mapToCombobox(items: string[] | undefined | null): ComboboxRow[] {
    const defaultOption: ComboboxRow = { label: 'Tất cả', value: '' };

    if (!items) return [defaultOption];

    return [
      defaultOption,
      ...items.map((item) => ({ label: item, value: item })),
    ];
  }

  ngOnInit(): void {
    initData<CourseFilterOptionsResponse>(
      this.guestCourseService.getOptionsFilter(),
      (data) => {
        console.log(data);
        // this.options = data;

        // 2. Sử dụng cực kỳ gọn gàng:
        this.cboxSubject = this.mapToCombobox(data.subjects);
        this.cboxCategory = this.mapToCombobox(data.categories);
        this.cboxTarget = this.mapToCombobox(data.targetGrades);
        this.cboxStatus = this.mapToCombobox(['ACTIVE', 'DRAFT']);
      },
    );
  }

  filter() {
    // 2. Sửa cách gọi: Dùng đúng tên biến mới và kích hoạt bằng .emit()
    if (this.form.valid) {
      this.filterEvent.emit(this.form.getRawValue());
    }
  }

  getControl(group: FormGroup, name: string): FormControl {
    return group.get(name) as FormControl;
  }
}

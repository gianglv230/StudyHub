import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { AccountStatusFilterOptions } from '../../../../../../utils/const/status.const';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { FormSelect } from '../../../../../_shared/components/form-select/form-select';

@Component({
  selector: 'app-student-searchbox',
  imports: [ReactiveFormsModule, FormInput, FormSelect],
  templateUrl: './student-searchbox.html',
  styleUrl: './student-searchbox.css',
})
export class StudentSearchbox {
  form: FormGroup; // Bỏ dấu '?' vì nó đã chắc chắn được khởi tạo trong constructor

  // 1. Sửa cú pháp Output: Định nghĩa chuẩn Generic <Kiểu_Dữ_Liệu>
  @Output() filterEvent = new EventEmitter<FilterAccountRequest>();

  cboxStatus: ComboboxRow[] = AccountStatusFilterOptions;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      fullname: [''],
      id: [null],
      username: [''],
      status: [''],
      email: [''],
      phone: [''],
    });
  }

  filterAccount() {
    // 2. Sửa cách gọi: Dùng đúng tên biến mới và kích hoạt bằng .emit()
    if (this.form.valid) {
      this.filterEvent.emit(this.form.getRawValue());
    }
  }

  getControl(group: FormGroup, name: string): FormControl {
    return group.get(name) as FormControl;
  }
}

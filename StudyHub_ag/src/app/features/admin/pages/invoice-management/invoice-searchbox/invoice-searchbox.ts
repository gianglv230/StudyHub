import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InvoiceStatusFilterOptions } from '../../../../../../utils/const/status.const';
import { FormInput } from "../../../../../_shared/components/form-input/form-input";
import { FormSelect } from "../../../../../_shared/components/form-select/form-select";

@Component({
  selector: 'app-invoice-searchbox',
  imports: [ReactiveFormsModule, FormInput, FormSelect],
  templateUrl: './invoice-searchbox.html',
  styleUrl: './invoice-searchbox.css',
})
export class InvoiceSearchbox {
  form: FormGroup; // Bỏ dấu '?' vì nó đã chắc chắn được khởi tạo trong constructor
  // 1. Sửa cú pháp Output: Định nghĩa chuẩn Generic <Kiểu_Dữ_Liệu>

  @Output() filterEvent = new EventEmitter<InvoiceFilterRequest>();

  cboxStatus: ComboboxRow[] = InvoiceStatusFilterOptions;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      invoiceId: [''],
      status: [''],
      dueDate: [''],
      orderCode: [''],
      studentId: [''],
      classId: [''],
      fromDate: [''],
      toDate: ['']
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

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateRange(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // Kiểm tra nếu không có giá trị (hoặc giá trị rỗng) thì bỏ qua để validator khác xử lý (như Validators.required)
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const length = String(value).length;

    // Trả về null nếu hợp lệ, ngược lại trả về object lỗi kèm thông tin chi tiết
    return length > min && length <= max
      ? null
      : {
          invalidRange: {
            actual: length,
            min: min,
            max: max,
            message: `Độ dài phải lớn hơn ${min} và nhỏ hơn hoặc bằng ${max} ký tự.`
          }
        };
  };
}
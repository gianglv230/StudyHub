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
          invalidRange: `Độ dài phải lớn hơn ${min} và nhỏ hơn hoặc bằng ${max} ký tự.`,
          // invalidRange: {
          //   actual: length,
          //   min: min,
          //   max: max,
          //   message: `Độ dài phải lớn hơn ${min} và nhỏ hơn hoặc bằng ${max} ký tự.`
          // }
        };
  };
}

export function dateLessThanValidator(
  startControlName: string,
  endControlName: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startControl = control.get(startControlName);
    const endControl = control.get(endControlName);

    // Nếu một trong hai control không tồn tại hoặc chưa có giá trị, bỏ qua validate chéo
    if (
      !startControl ||
      !endControl ||
      !startControl.value ||
      !endControl.value
    ) {
      return null;
    }

    const startDate = new Date(startControl.value);
    const endDate = new Date(endControl.value);

    // Kiểm tra điều kiện: Ngày bắt đầu lớn hơn ngày kết thúc
    if (startDate > endDate) {
      endControl.setErrors({
        ...endControl.errors,
        dateGreaterThan: 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu',
      });
    } else {
      // Nếu hợp lệ, xóa lỗi 'dateGreaterThan' cũ (nếu có) mà không làm mất các lỗi khác (như required, pattern...)
      if (endControl.errors) {
        const { dateGreaterThan, ...otherErrors } = endControl.errors;

        endControl.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null,
        );
      }
    }

    // Vì đây là Form-level validator, ta trả về null để không làm lỗi bản thân FormGroup
    return null;
  };
}

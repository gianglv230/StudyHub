import { AbstractControl, ValidationErrors } from '@angular/forms';

//Kiểm tra độ dài tên folder
export function validateResourceName(
  control: AbstractControl,
): ValidationErrors | null {
  const param = control.value;
  return param.length > 0 && param.length <= 255
    ? null
    : {
        invalidAddress: 'Phải hơn 0 ký tự và không quá 255 ký tự.',
      }; // Kiểm tra xem chuỗi còn lại có độ dài lớn hơn 0 hay không
}

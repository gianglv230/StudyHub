import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ERROR_CODE } from './error-code.validator';

//Kiểm tra tên đăng nhập
export function validateUsername(
  control: AbstractControl,
): ValidationErrors | null {
  const username = control.value;

  // Biểu thức chính quy:
  // ^: Bắt đầu chuỗi
  // [a-zA-Z0-9]+: Một hoặc nhiều ký tự chữ (hoa hoặc thường) hoặc số
  // $: Kết thúc chuỗi
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  // Kiểm tra độ dài và định dạng
  return username.length >= 6 &&
    username.length <= 40 &&
    usernameRegex.test(username)
    ? null
    : { invalidUserName: ERROR_CODE.INVALID_USERNAME };
}

//Kiểm tra mật khẩu
export function validatePwd(control: AbstractControl): ValidationErrors | null {
  const pwd = control?.value;

  return pwd.length >= 8 && pwd.length <= 20
    ? null
    : { invalidPwd: ERROR_CODE.INVALID_PWD };
}

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const verifyPassword = control.get('verifyPassword');

    if (!newPassword || !verifyPassword) {
      return null;
    }

    if (newPassword.value !== verifyPassword.value) {
      verifyPassword.setErrors({
        ...verifyPassword.errors,
        passwordNotMatch: 'Mật khẩu xác nhận không khớp',
      });
    } else {
      if (verifyPassword.errors) {
        const { passwordNotMatch, ...otherErrors } = verifyPassword.errors;

        verifyPassword.setErrors(
          Object.keys(otherErrors).length ? otherErrors : null,
        );
      }
    }

    return null;
  };
}

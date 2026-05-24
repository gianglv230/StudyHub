import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

//Kiểm tra họ và đệm
export function validateFirstName(
  control: AbstractControl,
): ValidationErrors | null {
  const firstName = control.value;
  const firstNameRegex = /^[A-Za-zÀ-ỹ\s]{4,40}[A-Za-zÀ-ỹ]$/;
  return firstNameRegex.test(firstName) && firstName.includes(' ')
    ? null
    : {
        invalidFirstName:
          'Họ và đệm chỉ chứa ký tự chữ và khoảng trắng. Từ 5 đến 40 ký tự.',
      };
}

//Kiểm tra tên
export function validateLastName(
  control: AbstractControl,
): ValidationErrors | null {
  const lastName = control.value;

  const lastNameRegex = /^[A-Za-zÀ-ỹ]{2,10}$/;

  return lastNameRegex.test(lastName)
    ? null
    : {
        invalidLastName: 'Tên chỉ chứa ký tự chữ. Từ 2 đến 10 ký tự.',
      };
}

//Kiểm tra email
export function validateEmail(
  control: AbstractControl,
): ValidationErrors | null {
  const email = control.value;

  // Biểu thức chính quy (regex) đơn giản để kiểm tra định dạng email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Kiểm tra xem email có khớp với regex hay không
  return emailRegex.test(email) ? null : { invalidEmail: 'Email không hợp lệ' };
}

//Kiểm tra tuổi dựa vào ngày sinh
export function validateAge(control: AbstractControl): ValidationErrors | null {
  const birthDate = new Date(control.value);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 5 && age <= 125
    ? null
    : { invalidAge: 'Ngày sinh không hợp lệ' };
}

// ValidatorFn
//Kiểm tra  độ tuổi xác định dựa vào ngày sinh
// export function validateAgeRange(minAge: number, maxAge: number): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const birthDateValue = control.value;
//     if (!birthDateValue) {
//       return { invalidAge: 'Ngày sinh không hợp lệ' }; // Hoặc xử lý trường hợp không có ngày sinh
//     }

//     const birthDate = new Date(birthDateValue);
//     const currentDate = new Date();

//     let age = currentDate.getFullYear() - birthDate.getFullYear();
//     const monthDifference = currentDate.getMonth() - birthDate.getMonth();

//     if (
//       monthDifference < 0 ||
//       (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }

//     return age >= minAge && age <= maxAge
//       ? null
//       : { invalidAge: 'Ngày sinh không hợp lệ' };
//   };
// }

//Kiểm tra địa chỉ
// export function validateAddressLite(
//   control: AbstractControl,
// ): ValidationErrors | null {
//   const param = control.value;
//   if (param == null || param.trim() == '') return null;
//   return param.length > 20 && param.length <= 255
//     ? null
//     : {
//         invalidAddress:
//           'Địa chỉ nếu được nhập thì phải hơn 20 ký tự và không quá 255 ký tự.',
//       }; // Kiểm tra xem chuỗi còn lại có độ dài lớn hơn 0 hay không
// }

//Kiểm tra địa chỉ
export function validateAddress(
  control: AbstractControl,
): ValidationErrors | null {
  const param = control.value;
  return param.length > 6 && param.length <= 255
    ? null
    : {
        invalidAddress: 'Phải hơn 6 ký tự và không quá 255 ký tự.',
      }; // Kiểm tra xem chuỗi còn lại có độ dài lớn hơn 0 hay không
}

//Kiểm tra số điện thoại
export function validatePhoneNumber(
  control: AbstractControl,
): ValidationErrors | null {
  const pn = control.value;

  // console.log(pn);
  const regex =
    /^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/;

  // console.log(regex.test(pn));
  return regex.test(pn) ? null : { invalidPhone: 'Số điện thoại không hợp lệ' };
}

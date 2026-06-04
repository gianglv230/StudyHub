import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../components/base/base-component';
import { initData } from '../../../utils/init-data';
import { UserAccountService } from '../../_service/user-account/user-account.service';
import { DynamicIcon } from '../components/dynamic-icon/dynamic-icon';
import { FormInput } from '../components/form-input/form-input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormSelect } from '../components/form-select/form-select';
import { GENDER_DATA } from '../../../utils/const/cbox-data.const';
import { ModalService } from '../../_service/utils/modal.service';
import { ChangePwd } from '../change-pwd/change-pwd';
import {
  validateAddress,
  validateAge,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
} from '../../../utils/validator/individual.validator';
import { delay, finalize } from 'rxjs';
import { CacheService, KEY_CACHE } from '../../_service/utils/cache.service';
import { AdminUserAccountService } from '../../features/admin/service/admin-user-account/admin-user-account.service';
import { generateSecurePassword } from '../../../utils/account-util';
import { validateRange } from '../../../utils/validator/factory.validator';
import { ROLE_TEXT } from '../../../utils/const/role.const';
import { Router } from '@angular/router';

interface form {
  // id: FormControl<number>,
  username: FormControl<string>;
  // password: FormControl<string>,
  // role: FormControl<string>,

  avatar: FormControl<any>;

  firstName: FormControl<string>;
  lastName: FormControl<string>;
  gender: FormControl<boolean>;
  dateOfBirth: FormControl<Date>;
  email: FormControl<string>;
  phone: FormControl<string>;
  hometown: FormControl<string>;
  address: FormControl<string>;
}

@Component({
  selector: 'app-account-management',
  imports: [DynamicIcon, FormInput, ReactiveFormsModule, FormSelect],
  templateUrl: './account-management.html',
  styleUrl: './account-management.css',
  encapsulation: ViewEncapsulation.None,
})
export class AccountManagement implements OnInit {
  @Input() type: 'MY_ACCOUNT' | 'ACCOUNT_MANAGEMENT' = 'MY_ACCOUNT';
  @Input() addRole: string = 'STUDENT';

  form: FormGroup<form>;
  form2?: FormGroup;

  isSubmitting = false;

  @Input() id?: number;

  account?: UserAccountBasicResponse;
  adminAccount?: AdminUserAccountBasicResponse;

  genderData: ComboboxRow[] = GENDER_DATA;

  avatarPreview: string | null = null; // Biến lưu chuỗi Base64 để hiển thị preview

  constructor(
    private readonly modalService: ModalService,
    private readonly base: BaseComponent,
    private readonly accountService: UserAccountService,
    private readonly adminAccountService: AdminUserAccountService,
    private readonly fb: FormBuilder,
    private readonly cacheService: CacheService,
    private readonly router: Router,
  ) {
    this.form = this.fb.nonNullable.group({
      username: [''],
      firstName: ['', [Validators.required, validateFirstName]],
      lastName: ['', [Validators.required, validateLastName]],
      gender: [true, Validators.required],
      dateOfBirth: [new Date(), [Validators.required, validateAge]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhoneNumber]],
      hometown: ['', [Validators.required, validateAddress]],
      address: ['', [Validators.required, validateAddress]],
      avatar: [null],
    });
  }

  ngOnInit(): void {
    if (this.type == 'MY_ACCOUNT') {
      this.initMyAccountData();
      return;
    }

    this.form2 = this.fb.group({
      id: [null],
      username: [null, [Validators.required, validateRange(8, 255)]],
      password: [null],
      role: [this.addRole],
      avatar: [null], // Đưa vào file
      firstName: ['', [Validators.required, validateFirstName]],
      lastName: ['', [Validators.required, validateLastName]],
      gender: [true, Validators.required],
      dateOfBirth: [new Date(), [Validators.required, validateAge]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhoneNumber]],
      hometown: ['', [Validators.required, validateAddress]],
      address: ['', [Validators.required, validateAddress]],
    });

    if (this.id) {
      // Update account form
      this.initAccountData();
      return;
    }

    // Add account form
    const newPwd = generateSecurePassword(12);
    this.form2.get('password')?.setValue(newPwd);
  }

  initMyAccountData() {
    initData<UserAccountBasicResponse>(
      this.accountService.getMyInfo(),
      (data) => {
        console.log(data);
        this.account = data;
        this.form.patchValue({
          username: this.account.username,
          firstName: this.account.firstName,
          lastName: this.account.lastName,
          gender: this.account.gender,
          dateOfBirth: this.account.dateOfBirth,
          email: this.account.email,
          phone: this.account.phone,
          hometown: this.account.hometown,
          address: this.account.address,
        });
      },
    );

    if (!this.isAdmin) {
      this.form.disable();
    }
  }

  get fullname(): string {
    return this.base.fullname;
  }

  get role(): string {
    return this.base.role;
  }

  get isAdmin(): boolean {
    return this.base.isAdmin();
  }

  getAddRole() {
    return ROLE_TEXT[this.addRole || ''] || '';
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.type == 'MY_ACCOUNT') {
      this.submitMyAccount();
      return;
    }
  }

  onSubmit2() {
    if (!this.form2) return;

    if (this.form2.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.id) {
      // Update account
      this.updateUserAccount();
      return;
    }

    this.addUserAccount();
  }

  submitMyAccount() {
    const formData = this.createFormData(this.form);

    // Append file avatar vào formData nếu người dùng có chọn file mới
    const avatarFile = this.form.get('avatar')?.value;
    if (avatarFile instanceof File) {
      formData.append('avatar', avatarFile, avatarFile.name);
    }

    this.isSubmitting = true;

    // const payload: UpdateMyUserAccountRequest = this.form.getRawValue();
    this.accountService
      .updateMyUserAccount(formData)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.account = res.data;
            this.form.patchValue({
              firstName: this.account.firstName,
              lastName: this.account.lastName,
              gender: this.account.gender,
              dateOfBirth: this.account.dateOfBirth,
              email: this.account.email,
              phone: this.account.phone,
              hometown: this.account.hometown,
              address: this.account.address,
            });
            this.cacheService.setItem(
              KEY_CACHE.FULLNAME,
              this.account.firstName + ' ' + this.account.lastName,
            );
            this.base.showSuccess('Cập nhật thông tin thành công');
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }

  openChangePwdModal() {
    this.modalService.open({
      component: ChangePwd,
    });
  }

  get class(): string {
    return this.isAdmin ? 'mt-2' : 'mt-5';
  }

  // Lấy dữ liệu đưa vào form
  initAccountData() {
    if (this.id && this.form2) {
      initData<AdminUserAccountBasicResponse>(
        this.adminAccountService.getUserAccount(this.id),
        (data) => {
          console.log(data);

          this.adminAccount = data;
          // Gán dữ liệu vào form
          // Gán dữ liệu vào form dùng patchValue
          this.form2?.patchValue({
            id: data.id,
            username: data.username, // Map từ username (API) sang userName (Form)
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            // Chuyển đổi định dạng Date nếu cần (nếu data.dateOfBirth trả về string dạng 'YYYY-MM-DD')
            dateOfBirth: data.dateOfBirth,
            email: data.email,
            phone: data.phone,
            hometown: data.hometown,
            address: data.address,
            // Trường avatar của form lưu File để upload, còn data.avatar từ API là string (URL/Path)
            // Nên ta không cần gán data.avatar vào form control, ảnh cũ đã được hiển thị qua template rồi
            avatar: null,
          });

          this.avatarPreview = data.avatar;
        },
      );
    }
  }

  createFormData(form: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(form.controls).forEach((key) => {
      const controlValue = form.get(key)?.value;

      // 1. Bỏ qua các trường null hoặc undefined không cần gửi lên server
      if (controlValue === null || controlValue === undefined) {
        return;
      }

      // 2. Nếu là File (như trường avatar)
      if (controlValue instanceof File) {
        formData.append(key, controlValue, controlValue.name);
      }
      // 3. Nếu là kiểu Date (như trường dateOfBirth) -> Format lại tùy theo API yêu cầu
      else if (controlValue instanceof Date) {
        // Ví dụ: format thành YYYY-MM-DD. Nếu API nhận ISOString thì dùng controlValue.toISOString()
        const formattedDate = controlValue.toISOString().split('T')[0];
        formData.append(key, formattedDate);
      }
      // 4. Nếu là các kiểu dữ liệu thông thường (string, number, boolean,...)
      else {
        // Dùng String(value) để chuẩn hóa dữ liệu khi đưa vào FormData
        formData.append(key, String(controlValue));
      }
    });

    return formData;
  }

  // UNIMPL
  // Cần in ra mật khẩu
  addUserAccount() {
    if (!this.form2) return;

    if (this.form2.invalid) {
      this.form2.markAllAsTouched();
      return;
    }

    // Khởi tạo FormData vì có chứa dữ liệu file nhị phân (Binary)
    // const formData = new FormData();

    // Append các field thông thường từ form vào FormData
    // Lưu ý: Nếu id hoặc password là null, cần handle tùy theo API yêu cầu
    // formData.append('userName', this.form2.get('userName')?.value);
    // formData.append('password', this.form2.get('password')?.value);
    // formData.append('role', this.form2.get('role')?.value);

    const formData = this.createFormData(this.form2);

    if (this.form2.get('id')?.value) {
      formData.append('id', this.form2.get('id')?.value);
    }

    // Append file avatar vào formData nếu người dùng có chọn file mới
    const avatarFile = this.form2.get('avatar')?.value;
    if (avatarFile instanceof File) {
      formData.append('avatar', avatarFile, avatarFile.name);
    }

    // Log ra console để bạn check thử xem các key đã ăn vào FormData chưa
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });

    // Gửi formData lên service để call API POST/PUT
    this.adminAccountService.addUserAccount(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.adminAccount = res.data;
          // this.form.patchValue({
          //   firstName: this.account.firstName,
          //   lastName: this.account.lastName,
          //   gender: this.account.gender,
          //   dateOfBirth: this.account.dateOfBirth,
          //   email: this.account.email,
          //   phone: this.account.phone,
          //   hometown: this.account.hometown,
          //   address: this.account.address,
          // });
          this.base.showSuccess('Đã thêm tài khoản mới');
          this.base.showSuccess(
            'Mật khẩu: ' + this.form2!.get('password')!.value,
            30000,
          );
        }
      },
      error: (err) => this.base.handleError(err),
      complete: () => (this.isSubmitting = false),
    });
  }

  // UNIMPL
  updateUserAccount() {
    if (!this.form2) return;

    if (this.form2.invalid) {
      this.form2.markAllAsTouched();
      return;
    }

    const formData = this.createFormData(this.form2);

    if (this.form2.get('id')?.value) {
      formData.append('id', this.form2.get('id')?.value);
    }

    // Append file avatar vào formData nếu người dùng có chọn file mới
    const avatarFile = this.form2.get('avatar')?.value;
    if (avatarFile instanceof File) {
      formData.append('avatar', avatarFile, avatarFile.name);
    }

    // Log ra console để bạn check thử xem các key đã ăn vào FormData chưa
    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });

    // Gửi formData lên service để call API POST/PUT
    this.adminAccountService.updateUserAccount(formData).subscribe({
      next: (res) => {
        console.log(res);
        if (res.error) {
          this.base.showDanger(res.message);
          return;
        }
        if (res.data) {
          this.adminAccount = res.data;
          // this.form.patchValue({
          //   firstName: this.account.firstName,
          //   lastName: this.account.lastName,
          //   gender: this.account.gender,
          //   dateOfBirth: this.account.dateOfBirth,
          //   email: this.account.email,
          //   phone: this.account.phone,
          //   hometown: this.account.hometown,
          //   address: this.account.address,
          // });
          this.base.showSuccess('Đã cập nhật tài khoản');
          this.initAccountData();
        }
      },
      error: (err) => this.base.handleError(err),
      complete: () => (this.isSubmitting = false),
    });
  }

  delUserAccount() {
    if (this.id) {
      this.adminAccountService.delUserAccount(this.id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã xóa tài khoản');
            // Đưa về trang danh sách - UNIMPL
            this.router.navigate(['/admin/quan-ly-hoc-vien']);
          }
        },
      });
    }
  }

  lockUserAccount() {
    if (this.id) {
      this.adminAccountService.lockUserAccount(this.id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã khóa tài khoản');
            // Reset lại data - UNIMPL
            this.initAccountData();
          }
        },
      });
    }
  }

  unLockUserAccount() {
    if (this.id) {
      this.adminAccountService.unLockUserAccount(this.id).subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã mở khóa tài khoản');
            // Reset lại data - UNIMPL
            this.initAccountData();
          }
        },
      });
    }
  }

  resetPwd() {
    if (this.id) {
      const payload: ChangePasswordRequest = {
        id: this.id,
        newPassword: generateSecurePassword(12),
      };
      this.adminAccountService.resetPwd(payload).subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess(
              'Mật khẩu mới: ' + payload.newPassword,
              30000,
            );
          }
        },
      });
    }
  }

  // 1. Xử lý khi user chọn ảnh
  onAdminFileSelected(event: Event): void {
    if (!this.form) return;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Đưa Object File vào Reactive Form để chuẩn bị submit
      this.form.patchValue({ avatar: file });
      this.form.get('avatar')?.updateValueAndValidity();

      // Đọc file thành định dạng Base64 để hiển thị UI Preview ngay lập tức
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // 1. Xử lý khi user chọn ảnh
  onFileSelected(event: Event): void {
    if (!this.form2) return;

    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Đưa Object File vào Reactive Form để chuẩn bị submit
      this.form2.patchValue({ avatar: file });
      this.form2.get('avatar')?.updateValueAndValidity();

      // Đọc file thành định dạng Base64 để hiển thị UI Preview ngay lập tức
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  get isEditMode(): boolean {
    return typeof this.id === 'number' && this.id > 0; // Hoặc !!this.id
  }
}

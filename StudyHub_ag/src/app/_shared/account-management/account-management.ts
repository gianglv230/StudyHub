import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { finalize } from 'rxjs';
import { CacheService, KEY_CACHE } from '../../_service/utils/cache.service';

interface form {
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
  form: FormGroup<form>;
  isSubmitting = false;

  account?: UserAccountBasicResponse;

  constructor(
    private readonly modalService: ModalService,
    private readonly base: BaseComponent,
    private readonly accountService: UserAccountService,
    private readonly fb: FormBuilder,
    private readonly cacheService: CacheService,
  ) {
    this.form = this.fb.nonNullable.group({
      firstName: ['', [Validators.required, validateFirstName]],
      lastName: ['', [Validators.required, validateLastName]],
      gender: [true, Validators.required],
      dateOfBirth: [new Date(), [Validators.required, validateAge]],
      email: ['', [Validators.required, validateEmail]],
      phone: ['', [Validators.required, validatePhoneNumber]],
      hometown: ['', [Validators.required, validateAddress]],
      address: ['', [Validators.required, validateAddress]],
    });
  }

  ngOnInit(): void {
    this.initAccountData();
  }

  initAccountData() {
    initData<UserAccountBasicResponse>(
      this.accountService.getMyInfo(),
      (data) => {
        console.log(data);
        this.account = data;
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

  get genderData(): ComboboxRow[] {
    return GENDER_DATA;
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: UpdateMyUserAccountRequest = this.form.getRawValue();
    this.accountService
      .updateMyUserAccount(payload)
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
}

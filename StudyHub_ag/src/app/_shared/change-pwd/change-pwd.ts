import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserAccountService } from '../../_service/user-account/user-account.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../components/base/base-component';
import { MODAL_DATA } from '../../_service/utils/token';
import {
  matchPasswordValidator,
  validatePwd,
} from '../../../utils/validator/auth.validator';
import { finalize } from 'rxjs';
import { FormInput } from "../components/form-input/form-input";

interface ChangePwdForm {
  oldPassword: FormControl<string | null>;
  newPassword: FormControl<string | null>;
  verifyPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-change-pwd',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './change-pwd.html',
  styleUrl: './change-pwd.css',
})
export class ChangePwd {
  isSubmitting = false;
  form: FormGroup<ChangePwdForm>;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly accountService: UserAccountService,
    private readonly base: BaseComponent,
  ) {
    this.form = this.fb.group(
      {
        oldPassword: ['', [Validators.required, validatePwd]],
        newPassword: ['', [Validators.required, validatePwd]],
        verifyPassword: ['', [Validators.required, validatePwd]],
      },
      {
        validators: matchPasswordValidator(),
      },
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValue = this.form.getRawValue();

    const payload: ChangePasswordRequest = {
      oldPassword: formValue.oldPassword ?? '',
      newPassword: formValue.newPassword ?? '',
    };

    this.accountService
      .changePwd(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã đổi mật khẩu');
            this.activeModal.close();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

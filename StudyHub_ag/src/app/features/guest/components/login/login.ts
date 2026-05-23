import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../_service/utils/token';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  validatePwd,
  validateUsername,
} from '../../../../../utils/validator/auth.validator';
import { FormInput } from '../../../../_shared/components/form-input/form-input';
import { BaseComponent } from '../../../../_shared/components/base/base-component';
import { AuthService } from '../../service/auth/auth.service';
import { finalize } from 'rxjs';
import {
  CacheService,
  KEY_CACHE,
} from '../../../../_service/utils/cache.service';
import { Router } from '@angular/router';
import {
  isAdmin,
  isStudent,
  isTeacher,
} from '../../../../../utils/const/role.const';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isSubmitting = false;
  loginForm: FormGroup<LoginForm>;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
    private readonly base: BaseComponent,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.group<LoginForm>({
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, validateUsername],
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, validatePwd],
      }),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload: UserAccountRequest = this.loginForm.getRawValue();
    this.authService
      .login(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            const account = res.data;
            this.cacheAuth(account);
            this.navigateRoleHome(account);
            this.activeModal.close();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }

  navigateRoleHome(account: AuthenticationResponse) {
    if (isStudent(account.role)) {
      this.router.navigate(['/hoc-vien/trang-chu']);
      return;
    }
    if (isTeacher(account.role)) {
      this.router.navigate(['/giao-vien/trang-chu']);
      return;
    }
    if (isAdmin(account.role)) {
      this.router.navigate(['/admin/trang-chu']);
      return;
    }
  }

  cacheAuth(account: AuthenticationResponse) {
    this.cacheService.setItem(KEY_CACHE.ACCESS_TOKEN, account.accessToken);
    this.cacheService.setItem(KEY_CACHE.FULLNAME, account.fullname);
    this.cacheService.setItem(KEY_CACHE.ROLE, account.role);
  }
}

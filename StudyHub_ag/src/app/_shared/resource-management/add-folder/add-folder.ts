import { Component, Inject } from '@angular/core';
import { FormInput } from '../../components/form-input/form-input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../_service/utils/token';
import { BaseComponent } from '../../components/base/base-component';
import { ResourceService } from '../../../_service/resource/resource.service';
import { validateResourceName } from '../../../../utils/validator/resource.validator';
import { finalize } from 'rxjs';

interface AddFolderForm {
  resourceName: FormControl<string>;
  resourceParentId: FormControl<number | null>;
}

@Component({
  selector: 'app-add-folder',
  imports: [ReactiveFormsModule, FormInput],
  templateUrl: './add-folder.html',
  styleUrl: './add-folder.css',
})
export class AddFolder {
  isSubmitting = false;
  form: FormGroup<AddFolderForm>;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly resourceService: ResourceService,
    private readonly base: BaseComponent,
  ) {
    this.form = this.fb.group<AddFolderForm>({
      resourceName: this.fb.nonNullable.control('', [
        Validators.required,
        validateResourceName,
      ]),
      resourceParentId: this.fb.control<number | null>(this.data.id),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const payload = this.form.getRawValue();

    console.log(payload);

    this.resourceService
      .addFolder(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã thêm folder');
            this.activeModal.close();
            this.resourceService.triggerRefreshFolder();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

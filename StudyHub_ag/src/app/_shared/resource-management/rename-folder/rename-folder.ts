import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs';
import { validateResourceName } from '../../../../utils/validator/resource.validator';
import { BaseComponent } from '../../components/base/base-component';
import { ResourceService } from '../../../_service/resource/resource.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../_service/utils/token';
import { FormInput } from "../../components/form-input/form-input";

interface UpdateFolderForm {
  id: FormControl<number>;
  resourceName: FormControl<string>;
}

@Component({
  selector: 'app-rename-folder',
  imports: [FormInput, ReactiveFormsModule],
  templateUrl: './rename-folder.html',
  styleUrl: './rename-folder.css',
})
export class RenameFolder {
  isSubmitting = false;
  form: FormGroup<UpdateFolderForm>;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA) public data: any,
    private readonly fb: FormBuilder,
    private readonly resourceService: ResourceService,
    private readonly base: BaseComponent,
  ) {
    this.form = this.fb.nonNullable.group<UpdateFolderForm>({
      resourceName: this.fb.control(this.data.resourceName, [
        Validators.required,
        validateResourceName,
      ]),
      id: this.fb.control(this.data.id),
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
      .renameFolder(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã sửa tên folder');
            this.activeModal.close();
            this.resourceService.triggerRefreshFolder();
          }
        },
        error: (err) => this.base.handleError(err),
        complete: () => (this.isSubmitting = false),
      });
  }
}

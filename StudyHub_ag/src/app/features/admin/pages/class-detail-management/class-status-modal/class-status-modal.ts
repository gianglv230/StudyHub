import { Component, Inject } from '@angular/core';
import { ModalOptions } from '../../../../../_service/utils/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../../../../../_service/utils/token';
import { FormInput } from '../../../../../_shared/components/form-input/form-input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormSelect } from "../../../../../_shared/components/form-select/form-select";
import { ClassStatusOptions } from '../../../../../../utils/const/status.const';
import { AdminClassService } from '../../../service/admin-class.service.ts/admin-class.service';
import { BaseComponent } from '../../../../../_shared/components/base/base-component';

@Component({
  selector: 'app-class-status-modal',
  imports: [FormInput, FormSelect, ReactiveFormsModule ],
  templateUrl: './class-status-modal.html',
  styleUrl: './class-status-modal.css',
})
export class ClassStatusModal {
  modalOptions!: ModalOptions;
  form?: FormGroup;
  cboxData?: ComboboxRow[];

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(MODAL_DATA)
    public data: { slug?: string, id?: number; status?: ClassStatus } | null,
    private readonly fb: FormBuilder,
    private readonly classService: AdminClassService,
    private readonly base: BaseComponent
  ) {}

  ngOnInit() {
    this.cboxData = ClassStatusOptions;

    if (this.data?.id && this.data.status) {
      this.form = this.fb.group({
        id: [this.data.id],
        classSlug: [this.data.slug],
        status: [this.data.status],
      });
    }
  }

  getControl(group: any, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  submit() {
    this.classService.updateStatusClass(this.form?.value)
    .subscribe({
      next: (res) => {
          console.log(res);
          if (res.error) {
            this.base.showDanger(res.message);
            return;
          }
          if (res.data) {
            this.base.showSuccess('Đã cập nhật trạng thái');
            this.activeModal.close();
            this.classService.triggerRefreshClass();
          }
        },
        error: (err) => this.base.handleError(err),
        // complete: () => (this.isSubmitting = false),
    })
  }
}

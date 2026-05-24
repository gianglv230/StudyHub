import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { isInvalidComp } from '../../../../utils/validator/common.validator';

@Component({
  selector: 'app-form-select',
  imports: [ReactiveFormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.css',
})
export class FormSelect {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;
  @Input() id?: string;
  @Input() isFloating: boolean = true;
  @Input({ required: true }) data!: ComboboxRow[];

  get isInvalid(): boolean {
    return isInvalidComp(this.control);
  }

  /**
   * Lấy message của lỗi đầu tiên trong control.errors.
   * Validator phải trả về dạng { errorKey: 'Error message string' }
   */
  get errorMessage(): string | null {
    const errors = this.control?.errors;
    if (!errors) return null;
    const firstMessage = Object.values(errors).find(
      (v) => typeof v === 'string',
    );
    return (firstMessage as string) ?? null;
  }
}

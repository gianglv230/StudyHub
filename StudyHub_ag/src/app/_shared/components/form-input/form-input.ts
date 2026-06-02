import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { isInvalidComp } from '../../../../utils/validator/common.validator';

@Component({
  selector: 'app-form-input',
  imports: [ReactiveFormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) label!: string;

  @Input() type: 'text' | 'date' | 'number' | 'email' | 'password' = 'text';
  @Input() placeholder: string = ' ';
  @Input() id?: string;
  @Input() isFloating: boolean = true;
  @Input() readOnly = false;

  @Input() pattern?: string;

  private get regex(): RegExp | null {
    return this.pattern ? new RegExp(this.pattern) : null;
  }

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

  onKeyDown(event: KeyboardEvent) {
    if (!this.regex) return;

    // Allow Ctrl/Command shortcuts
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
    ];

    if (allowedKeys.includes(event.key)) return;

    const input = event.target as HTMLInputElement;

    const nextValue =
      input.value.substring(0, input.selectionStart ?? 0) +
      event.key +
      input.value.substring(input.selectionEnd ?? 0);

    if (!this.regex.test(nextValue)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    if (!this.regex) return;

    const pastedText = event.clipboardData?.getData('text') ?? '';

    const input = event.target as HTMLInputElement;

    const nextValue =
      input.value.substring(0, input.selectionStart ?? 0) +
      pastedText +
      input.value.substring(input.selectionEnd ?? 0);

    if (!this.regex.test(nextValue)) {
      event.preventDefault();
    }
  }
}

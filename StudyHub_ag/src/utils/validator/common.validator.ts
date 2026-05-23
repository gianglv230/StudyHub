import { AbstractControl, FormGroup } from "@angular/forms";

export function isInvalid(controlName: string, form: FormGroup): boolean {
  const control = form.get(controlName);
  return !!(control && control.invalid && (control.touched || control.dirty));
}

export function isInvalidComp(control: AbstractControl | null): boolean {
  return !!(control && control.invalid && (control.touched || control.dirty));
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-field',
  imports: [],
  templateUrl: './info-field.html',
  styleUrl: './info-field.css',
})
export class InfoField {
  @Input()
  label?: string;

  @Input()
  value!: any;

  @Input()
  classInfo: any = "fw-bold text-primary-container";
}

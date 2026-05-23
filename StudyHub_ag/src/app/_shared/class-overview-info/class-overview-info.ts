import { Component, Input, ViewEncapsulation } from '@angular/core';
import { InfoField } from "../components/info-field/info-field";
import { DynamicIcon } from "../components/dynamic-icon/dynamic-icon";
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-class-overview-info',
  imports: [InfoField, DynamicIcon, DecimalPipe, DatePipe, RouterLink],
  templateUrl: './class-overview-info.html',
  styleUrl: './class-overview-info.css',
  encapsulation: ViewEncapsulation.None
})
export class ClassOverviewInfo {
  @Input()
  class?: ClassDetailLiteResponse

}

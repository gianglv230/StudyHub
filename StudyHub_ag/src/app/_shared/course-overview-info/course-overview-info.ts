import { Component, Input } from '@angular/core';
import { DynamicIcon } from '../components/dynamic-icon/dynamic-icon';
import { InfoField } from '../components/info-field/info-field';

@Component({
  selector: 'app-course-overview-info',
  imports: [DynamicIcon, InfoField],
  templateUrl: './course-overview-info.html',
  styleUrl: './course-overview-info.css',
})
export class CourseOverviewInfo {
  @Input()
  course?: CourseDetailLiteResponse;

  @Input()
  availableClass?: number;
}

import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ClassStatusColorMap,
  ClassStatusMap,
} from '../../../../../../utils/const/status.const';

@Component({
  selector: 'app-class-detail-info',
  imports: [DatePipe],
  templateUrl: './class-detail-info.html',
  styleUrl: './class-detail-info.css',
})
export class ClassDetailInfo {
  @Input() classInfo?: AdminClassInfoResponse;

  get status() {
    if (this.classInfo?.status) {
      return ClassStatusMap[this.classInfo.status];
    }
    return '';
  }

  get statusColor() {
    if (this.classInfo?.status) {
      return ClassStatusColorMap[this.classInfo.status];
    }
    return '';
  }
}

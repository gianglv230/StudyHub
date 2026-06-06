import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardContainer } from '../card-container/card-container';
import { DynamicIcon } from '../dynamic-icon/dynamic-icon';
import { InfoField } from '../info-field/info-field';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ClassStatusMap } from '../../../../utils/const/status.const';

@Component({
  selector: 'app-admin-class-card',
  imports: [
    RouterLink,
    CardContainer,
    DynamicIcon,
    InfoField,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './admin-class-card.html',
  styleUrl: './admin-class-card.css',
})
export class AdminClassCard {
  @Input() card!: ClassAdminResponse;

  getClassStatus(status: ClassStatus): string {
    return ClassStatusMap[status];
  }

  getClassStatusColor(status: ClassStatus): string {
    switch (status) {
      case 'UPCOMING':
        return 'bg-primary';
      case 'ONGOING':
        return 'bg-success';
      case 'CANCELED':
        return 'bg-danger';
      case 'FINISHED':
        return 'bg-warning';
    }
  }

  get cardContainer(): CardContainerModel {
    return {
      title: this.card.className,
      categoryName: this.card.categoryName,
      subject: this.card.subject,
      targetGrade: this.card.targetGrade,
      thumbnail: this.card.thumbnail,
    };
  }
}

import { Component, Input } from '@angular/core';
import { CardContainer } from '../card-container/card-container';
import { InfoField } from '../info-field/info-field';
import { DynamicIcon } from '../dynamic-icon/dynamic-icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-class-lite-card',
  imports: [CardContainer, InfoField, DynamicIcon, DatePipe, DecimalPipe, RouterLink],
  templateUrl: './class-lite-card.html',
  styleUrl: './class-lite-card.css',
})
export class ClassLiteCard {
  @Input()
  card!: ClassLiteResponse;

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

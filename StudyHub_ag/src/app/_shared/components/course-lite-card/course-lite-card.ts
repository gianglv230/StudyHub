import { Component, Input } from '@angular/core';
import { CardContainer } from "../card-container/card-container";
import { DynamicIcon } from '../dynamic-icon/dynamic-icon';
import { InfoField } from "../info-field/info-field";

@Component({
  selector: 'app-course-lite-card',
  imports: [CardContainer, DynamicIcon, InfoField],
  templateUrl: './course-lite-card.html',
  styleUrl: './course-lite-card.css',
})
export class CourseLiteCard {
  @Input()
  card!: CourseLiteProjection;

  get cardContainer(): CardContainerModel {
    return {
      title: this.card.title,
      categoryName: this.card.categoryName,
      subject: this.card.subject,
      targetGrade: this.card.targetGrade,
      thumbnail: this.card.thumbnail
    }
  }
}

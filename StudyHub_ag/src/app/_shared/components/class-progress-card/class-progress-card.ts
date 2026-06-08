import { Component, Input } from '@angular/core';
import { CardContainer } from "../card-container/card-container";
import { InfoField } from "../info-field/info-field";
import { DynamicIcon } from "../dynamic-icon/dynamic-icon";
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-class-progress-card',
  imports: [CardContainer, InfoField, DynamicIcon, DatePipe, RouterLink],
  templateUrl: './class-progress-card.html',
  styleUrl: './class-progress-card.css',
})
export class ClassProgressCard {
  @Input()
  card!: ClassProgressResponse;

  @Input() isStudent: boolean = true;

  get cardContainer(): CardContainerModel {
    return {
      title: this.card.className,
      categoryName: this.card.categoryName,
      subject: this.card.subject,
      targetGrade: this.card.targetGrade,
      thumbnail: this.card.thumbnail,
    };
  }

  routerLink(slug: string): string {
    return this.isStudent ? "/hoc-vien/lop-hoc/" + slug : "/giao-vien/lop-hoc/" + slug;
  }
}

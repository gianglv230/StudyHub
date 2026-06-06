import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardContainer } from "../card-container/card-container";
import { InfoField } from "../info-field/info-field";
import { DynamicIcon } from "../dynamic-icon/dynamic-icon";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-course-card',
  imports: [RouterLink, CardContainer, InfoField, DynamicIcon, DatePipe],
  templateUrl: './admin-course-card.html',
  styleUrl: './admin-course-card.css',
})
export class AdminCourseCard {
  @Input() card!: CourseAdminResponse;
}

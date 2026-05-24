import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicIcon } from '../../components/dynamic-icon/dynamic-icon';
import {
  NgbAccordionDirective,
  NgbAccordionItem,
  NgbAccordionHeader,
  NgbAccordionCollapse,
  NgbAccordionButton,
  NgbAccordionBody,
  NgbSlide,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lesson-list',
  imports: [
    DynamicIcon,
    NgbAccordionDirective,
    NgbAccordionItem,
    NgbAccordionHeader,
    NgbAccordionCollapse,
    NgbAccordionButton,
    NgbAccordionBody,
  ],
  templateUrl: './lesson-list.html',
  styleUrl: './lesson-list.css',
})
export class LessonList implements AfterViewInit {
  @ViewChild('accordion')
  accordion!: NgbAccordionDirective;

  ngAfterViewInit(): void {
    this.accordion.expandAll();
  }
}

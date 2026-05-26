import { Component, Input } from '@angular/core';
import { ClassProgressCard } from '../components/class-progress-card/class-progress-card';

@Component({
  selector: 'app-class-list',
  imports: [ClassProgressCard],
  templateUrl: './class-list.html',
  styleUrl: './class-list.css',
})
export class ClassList {
  @Input()
  classes?: ClassProgressResponse[];

  @Input()
  label?: string;

  @Input()
  classLabel?: string;

  @Input()
  class: string = "pt-4 pt-lg-5 mt-4"
}

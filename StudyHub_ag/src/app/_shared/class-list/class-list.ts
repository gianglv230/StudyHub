import { Component, Input, OnInit } from '@angular/core';
import { ClassProgressCard } from '../components/class-progress-card/class-progress-card';
import { BaseComponent } from '../components/base/base-component';

@Component({
  selector: 'app-class-list',
  imports: [ClassProgressCard],
  templateUrl: './class-list.html',
  styleUrl: './class-list.css',
})
export class ClassList implements OnInit {
  @Input()
  classes?: ClassProgressResponse[];

  @Input()
  label?: string;

  @Input()
  classLabel?: string;

  @Input()
  class: string = "pt-4 pt-lg-5 mt-4"

  isStudent = true;

  constructor(private readonly base: BaseComponent){}

  ngOnInit(): void {
      this.isStudent = this.base.isStudent();
  }
}

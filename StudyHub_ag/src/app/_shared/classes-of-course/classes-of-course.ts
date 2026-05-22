import { Component, Input } from '@angular/core';
import { ClassLiteCard } from "../components/class-lite-card/class-lite-card";

@Component({
  selector: 'app-classes-of-course',
  imports: [ClassLiteCard],
  templateUrl: './classes-of-course.html',
  styleUrl: './classes-of-course.css',
})
export class ClassesOfCourse {
  @Input()
  classes?: ClassLiteResponse[];
}

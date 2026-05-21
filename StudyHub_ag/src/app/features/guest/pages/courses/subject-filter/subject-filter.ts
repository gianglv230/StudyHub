import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-subject-filter',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './subject-filter.html',
  styleUrl: './subject-filter.css',
})
export class SubjectFilter {
  @Input()
  subjects?: string[]

  @Input()
  subject?: string;

  isActive(subject: string){
    return this.subject == subject;
  }
}

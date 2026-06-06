import { Component, Input } from '@angular/core';
import { DynamicIcon } from "../../../components/dynamic-icon/dynamic-icon";

@Component({
  selector: 'app-lesson-minor',
  imports: [DynamicIcon],
  templateUrl: './lesson-minor.html',
  styleUrl: './lesson-minor.css',
})
export class LessonMinor {
  @Input() section?: SectionTeacherResponse;

  isDescription = true;

  switchTab(isDescription: boolean){
    this.isDescription = isDescription;
  }
}

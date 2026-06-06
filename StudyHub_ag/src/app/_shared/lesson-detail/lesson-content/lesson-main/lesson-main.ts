import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-main',
  imports: [],
  templateUrl: './lesson-main.html',
  styleUrl: './lesson-main.css',
})
export class LessonMain {
  @Input() section?: SectionTeacherResponse;

  get videoThumbnail(): string | undefined {
    if (!this.section?.videoContent) return '';
    const fileName = this.section.videoContent!.url!;

    // cắt extension cuối
    const lastDotIndex = fileName.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      return fileName.substring(0, lastDotIndex) + '.avif';
    }

    return fileName + '.avif';
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-detail-info',
  imports: [],
  templateUrl: './course-detail-info.html',
  styleUrl: './course-detail-info.css',
})
export class CourseDetailInfo {
  @Input()
  course?: CourseDetailInfoModel;
  
  get lessons(): LessonLiteResponse[] {
    return [...(this?.course?.lessons || [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
  }

  get videoThumbnail(): string | undefined {
    if (!this.course?.video) return '';
    const fileName = this.course.video!;

    // cắt extension cuối
    const lastDotIndex = fileName.lastIndexOf('.');

    if (lastDotIndex !== -1) {
      return fileName.substring(0, lastDotIndex) + '.avif';
    }

    return fileName + '.avif';
  }
}

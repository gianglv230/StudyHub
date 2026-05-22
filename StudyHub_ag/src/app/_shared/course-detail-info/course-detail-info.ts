import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-detail-info',
  imports: [],
  templateUrl: './course-detail-info.html',
  styleUrl: './course-detail-info.css',
})
export class CourseDetailInfo {
  @Input()
  course?: CourseDetailLiteResponse;
  
  get lessons(): LessonLiteResponse[] {
    return [...(this?.course?.lessons || [])].sort(
      (a, b) => a.orderIndex - b.orderIndex,
    );
  }
}

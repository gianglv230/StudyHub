import { Component, OnInit } from '@angular/core';
import { LessonList } from './lesson-list/lesson-list';
import { LessonContent } from './lesson-content/lesson-content';
import { ClassLessonService } from '../../_service/class-lesson/class-lesson.service';
import { ActivatedRoute } from '@angular/router';
import { initData } from '../../../utils/init-data';
import { TeacherClassLessonService } from '../../features/teacher/service/teacher-class-lesson/teacher-class-lesson.service';

@Component({
  selector: 'app-lesson-detail',
  imports: [LessonList, LessonContent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css',
})
export class LessonDetail implements OnInit {
  data?: ClassLessonTeacherResponse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classLessonService: TeacherClassLessonService,
  ) {}
  ngOnInit(): void {
    const classSlug = this.route.snapshot.paramMap.get('class-slug') || '';
    const lessonSlug = this.route.snapshot.paramMap.get('lesson-slug') || '';
    if (classSlug && lessonSlug) {
      initData<ClassLessonTeacherResponse>(
        this.classLessonService.getClassLesson(classSlug, lessonSlug),
        (data) => {
          console.log(data);
          // 1. Kiểm tra xem data và data.sections có tồn tại hay không để tránh lỗi crash ứng dụng
          if (data && Array.isArray(data.sections)) {
            // 2. Tiến hành sort mảng sections theo orderIndex tăng dần
            data.sections.sort((a, b) => a.orderIndex - b.orderIndex);
          }

          // 3. Sau khi đã sort xong thì mới gán vào biến class
          this.data = data;
        },
      );
    }
  }
}

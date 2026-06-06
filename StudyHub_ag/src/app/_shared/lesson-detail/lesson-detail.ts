import { Component, OnInit } from '@angular/core';
import { LessonList } from './lesson-list/lesson-list';
import { LessonContent } from './lesson-content/lesson-content';
import { ClassLessonService } from '../../_service/class-lesson/class-lesson.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { initData } from '../../../utils/init-data';
import { TeacherClassLessonService } from '../../features/teacher/service/teacher-class-lesson/teacher-class-lesson.service';
import { BaseComponent } from '../components/base/base-component';

@Component({
  selector: 'app-lesson-detail',
  imports: [LessonList, LessonContent, RouterLink],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css',
})
export class LessonDetail implements OnInit {
  data?: ClassLessonTeacherResponse;
  isStudent: boolean = true;
  classSlug: string = '';
  lessonSlug: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classLessonService: TeacherClassLessonService,
    private readonly base: BaseComponent,
  ) {}
  ngOnInit(): void {
    this.classSlug = this.route.snapshot.paramMap.get('class-slug') || '';
    this.lessonSlug = this.route.snapshot.paramMap.get('lesson-slug') || '';
    this.isStudent = this.base.isStudent();
    if (this.classSlug && this.lessonSlug) {
      initData<ClassLessonTeacherResponse>(
        this.classLessonService.getClassLesson(this.classSlug, this.lessonSlug),
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

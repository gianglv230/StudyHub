import { Component, inject, Input, OnInit } from '@angular/core';
import { LessonMain } from './lesson-main/lesson-main';
import { LessonMinor } from './lesson-minor/lesson-minor';
import { TeacherClassLessonService } from '../../../features/teacher/service/teacher-class-lesson/teacher-class-lesson.service';

@Component({
  selector: 'app-lesson-content',
  imports: [LessonMain, LessonMinor],
  templateUrl: './lesson-content.html',
  styleUrl: './lesson-content.css',
})
export class LessonContent implements OnInit {
  @Input() classLessonTeacher?: ClassLessonTeacherResponse;

  // Inject service (Cách viết gọn của Angular mới)
  private lessonService = inject(TeacherClassLessonService);
  currentSelectedSectionId: number | null = null;

  ngOnInit(): void {
    // Lắng nghe sự kiện mỗi khi có section được click
    this.lessonService.selectedSection$.subscribe((section) => {
      if (!this.classLessonTeacher) return;
      if (section) {
        this.currentSelectedSectionId = section.id;
      } else if (this.classLessonTeacher?.sections?.length > 0) {
        // Nếu chưa chọn gì, mặc định hiển thị phần tử đầu tiên
        this.currentSelectedSectionId = this.classLessonTeacher.sections[0].id;
      }
    });
  }
}

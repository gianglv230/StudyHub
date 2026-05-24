import { Component, OnInit } from '@angular/core';
import { LessonList } from './lesson-list/lesson-list';
import { LessonContent } from './lesson-content/lesson-content';
import { ClassLessonService } from '../../_service/class-lesson/class-lesson.service';
import { ActivatedRoute } from '@angular/router';
import { initData } from '../../../utils/init-data';

@Component({
  selector: 'app-lesson-detail',
  imports: [LessonList, LessonContent],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css',
})
export class LessonDetail implements OnInit {
  data?: LessonSectionResponse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classLessonService: ClassLessonService,
  ) {}
  ngOnInit(): void {
    const classSlug = this.route.snapshot.paramMap.get('class-slug') || '';
    const lessonSlug = this.route.snapshot.paramMap.get('lesson-slug') || '';
    if (classSlug && lessonSlug) {
      initData<LessonSectionResponse>(
        this.classLessonService.getContensOfClass(classSlug, lessonSlug),
        (data) => {
          console.log(data);
          this.data = data;
        },
      );
    }
  }
}

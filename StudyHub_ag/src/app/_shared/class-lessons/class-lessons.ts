import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { initData } from '../../../utils/init-data';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../../_service/class/class.service';
import { DynamicIcon } from '../components/dynamic-icon/dynamic-icon';
import { ClassLessonCard } from '../components/class-lesson-card/class-lesson-card';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-class-lessons',
  imports: [DynamicIcon, ClassLessonCard, NgStyle],
  templateUrl: './class-lessons.html',
  styleUrl: './class-lessons.css',
  encapsulation: ViewEncapsulation.None,
})
export class ClassLessons implements OnInit {
  data?: ClassLessonResponse;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: ClassService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('class-slug');
    if (!slug) {
      return;
    }
    initData<ClassLessonResponse>(
      this.classService.getClassLessonOfClass(slug),
      (data) => {
        console.log(data);
        this.data = data;
      },
    );
  }

  get progress(): number {
    if (this.data) {
      return Math.round(
        (this.data.progressOfClass / this.data.numberOfLesson) * 100,
      );
    }
    return 0;
  }

  get classLessons(): ClassLessonBasicResponse[]{
    return this.data?.lessons || [];
  }
}

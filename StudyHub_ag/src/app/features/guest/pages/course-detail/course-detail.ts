import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseOverviewInfo } from '../../../../_shared/course-overview-info/course-overview-info';
import { CourseDetailInfo } from '../../../../_shared/course-detail-info/course-detail-info';
import { ClassesOfCourse } from '../../../../_shared/classes-of-course/classes-of-course';
import { ActivatedRoute } from '@angular/router';
import { initData } from '../../../../../utils/init-data';
import { GuestCourseService } from '../../service/guest-course/guest-course.service';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';
import { GuestClassService } from '../../service/guest-class/guest-class.service';

@Component({
  selector: 'app-course-detail',
  imports: [
    CourseOverviewInfo,
    CourseDetailInfo,
    ClassesOfCourse,
    SpinnerComponent,
  ],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course?: CourseDetailLiteResponse;
  classes?: ClassLiteResponse[];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: GuestCourseService,
    private readonly classService: GuestClassService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.initDetailCourse(slug);
    this.initClassOfCourse(slug);
  }

  initClassOfCourse(slug: string | null) {
    if (!slug) return;
    initData<ClassLiteResponse[]>(
      this.classService.getClassOfCourse(slug),
      (data) => {
        this.classes = data;
      },
    );
  }

  initDetailCourse(slug: string | null) {
    if (!slug) return;
    initData<CourseDetailLiteResponse>(
      this.courseService.getDetail(slug),
      (data) => {
        console.log(data);
        this.course = data;
      },
    );
  }

  get availableClass(): number {
    return this.classes?.length || 0;
  }
}

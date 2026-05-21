import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryList } from '../courses/category-list/category-list';
import { CourseFilter } from '../courses/course-filter/course-filter';
import { ClassesList } from './classes-list/classes-list';
import { SubjectFilter } from '../courses/subject-filter/subject-filter';
import { BaseFilterable } from '../../components/base/base-filterable';
import { ActivatedRoute } from '@angular/router';
import { GuestCourseService } from '../../service/guest-course/guest-course.service';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';
import { Pagination } from '../../../../_shared/components/pagination/pagination';
import { initData } from '../../../../../utils/init-data';
import { GuestClassService } from '../../service/guest-class/guest-class.service';
import { Empty } from "../../../../_shared/empty/empty";

@Component({
  selector: 'app-classes',
  imports: [
    CategoryList,
    CourseFilter,
    ClassesList,
    SubjectFilter,
    SpinnerComponent,
    Pagination,
    Empty
],
  templateUrl: './classes.html',
  styleUrl: './classes.css',
})
export class Classes extends BaseFilterable<ClassLiteResponse> implements OnInit, OnDestroy {
  constructor(
    route: ActivatedRoute,
    courseService: GuestCourseService,
    private readonly classService: GuestClassService,
  ) {
    super(route, courseService);
  }

  override initMainData(
    page: number,
    subject: string,
    target: string,
    category: string,
  ): void {
    initData<PageResponse<ClassLiteResponse>>(
      this.classService.filterClass(page, subject, target, category),
      (pageData) => {
        console.log(pageData);
        this.pageData = pageData;
      },
    );
  }
}

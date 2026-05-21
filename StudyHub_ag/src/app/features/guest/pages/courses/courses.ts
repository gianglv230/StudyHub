import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryList } from './category-list/category-list';
import { CourseFilter } from './course-filter/course-filter';
import { SubjectFilter } from './subject-filter/subject-filter';
import { ActivatedRoute } from '@angular/router';
import { GuestCourseService } from '../../service/guest-course/guest-course.service';
import { initData } from '../../../../../utils/init-data';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';
import { SearchResult } from '../course-search/search-result/search-result';
import { Pagination } from '../../../../_shared/components/pagination/pagination';
import { Empty } from '../../../../_shared/empty/empty';
import { BaseFilterable } from '../../components/base/base-filterable';

@Component({
  selector: 'app-courses',
  imports: [
    CategoryList,
    CourseFilter,
    SubjectFilter,
    SpinnerComponent,
    SearchResult,
    Pagination,
    Empty,
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses extends BaseFilterable<CourseLiteProjection> implements OnInit, OnDestroy {

  constructor(
    route: ActivatedRoute,
    courseService: GuestCourseService,
  ) {
    super(route, courseService);
  }

  override initMainData(
    page: number,
    subject: string,
    target: string,
    category: string,
  ) : void {
    initData<PageResponse<CourseLiteProjection>>(
      this.courseService.filterCourse(page, subject, target, category),
      (pageData) => {
        console.log(pageData);
        this.pageData = pageData;
      },
    );
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CourseHeader } from './course-header/course-header';
import { CourseSearchbox } from './course-searchbox/course-searchbox';
import { CourseResult } from './course-result/course-result';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { initData } from '../../../../../utils/init-data';
import { AdminCourseService } from '../../service/admin-course-service/admin-course.service';

@Component({
  selector: 'app-course-management',
  imports: [CourseHeader, CourseSearchbox, CourseResult],
  templateUrl: './course-management.html',
  styleUrl: './course-management.css',
})
export class CourseManagement implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;

  filterRequest?: CourseFilterRequest;
  pageData?: PageResponse<CourseAdminResponse>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: AdminCourseService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        if (!this.filterRequest) {
          // Định nghĩa filterRequest chính là kiểu FilterAccountRequest
          const { page, ...restParams } = params;
          const filterRequest: CourseFilterRequest = restParams;

          // Ngay lập tức TypeScript sẽ check: Nếu 'STUDENT' không nằm trong kiểu 'Role', nó sẽ báo lỗi ngay!
          this.filterRequest = filterRequest;
        }

        // Nếu trên URL không có page thì mặc định là trang '1' hoặc '' tùy bạn
        const currentPage = params['page'] || '1';

        this.initData(this.filterRequest, currentPage);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  initData(filter: CourseFilterRequest, page: string) {
    initData<PageResponse<CourseAdminResponse>>(
      this.courseService.filter(filter, page),
      (data) => {
        console.log(data);
        this.pageData = data;
      },
    );
  }

  filter($event: CourseFilterRequest){
    this.initData($event, '1');
  }
}

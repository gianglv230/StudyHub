import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminClassService } from '../../service/admin-class/admin-class.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { initData } from '../../../../../utils/init-data';
import { ClassResult } from "../class-management/class-result/class-result";
import { Empty } from "../../../../_shared/empty/empty";

@Component({
  selector: 'app-admin-class-of-course',
  imports: [ClassResult, RouterLink, Empty],
  templateUrl: './admin-class-of-course.html',
  styleUrl: './admin-class-of-course.css',
})
export class AdminClassOfCourse implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;

  courseSlug?: string | null;
  pageData?: PageResponse<ClassAdminResponse>;

  constructor(
    private readonly classService: AdminClassService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.courseSlug = this.route.snapshot.paramMap.get('course-slug');

    if (this.courseSlug) {
      this.queryParamsSubscription = this.route.queryParams.subscribe(
        (params) => {
          // Nếu trên URL không có page thì mặc định là trang '1' hoặc '' tùy bạn
          const currentPage = params['page'] || '1';
          this.initData(this.courseSlug!, currentPage);
        },
      );
    }
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  initData(courseSlug: string, page: string = '1') {
    initData<PageResponse<ClassAdminResponse>>(
      this.classService.getClassAdminOfCourse(courseSlug, page),
      (data) => {
        console.log(data);
        this.pageData = data;
      },
    );
  }
}

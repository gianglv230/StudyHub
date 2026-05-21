import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { initData } from '../../../../../utils/init-data';
import { ActivatedRoute } from '@angular/router';
import { GuestCourseService } from '../../service/guest-course/guest-course.service';
import { toPaginationModel } from '../../../../../utils/page-data';

@Component({
  selector: 'app-basefilterable',
  template: '',
})
export abstract class BaseFilterable<T> implements OnInit, OnDestroy {
  protected queryParamsSubscription!: Subscription;
  protected pageData!: PageResponse<T>;
  protected filterOptions!: CourseFilterOptionsResponse;
  protected target?: string;
  protected subject?: string;
  protected category?: string;

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly courseService: GuestCourseService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const page = params['page'] || '1';
        const subject = params['subject'] || '';
        const target = params['target'] || '';
        const category = params['category'] || '';

        // this.target = target;
        // console.log(target);
        this.initMainData(page, subject, target, category);
      },
    );

    this.initFilteOption();
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const page = params['page'] || '1';
        const subject = params['subject'] || '';
        const target = params['target'] || '';
        const category = params['category'] || '';

        // this.target = target;
        // console.log(target);
        this.initMainData(page, subject, target, category);
      },
    );
  }

  abstract initMainData(
    page: number,
    subject: string,
    target: string,
    category: string,
  ): void;

  initFilteOption() {
    initData<CourseFilterOptionsResponse>(
      this.courseService.getOptionsFilter(),
      (data) => {
        this.filterOptions = data;
      },
    );
  }

  get paginationModel(): PaginationModel {
    return toPaginationModel(this.pageData);
  }
}

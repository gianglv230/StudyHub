import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchSection } from '../home-guest/search-section/search-section';
import { SearchResult } from './search-result/search-result';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { initData } from '../../../../../utils/init-data';
import { GuestCourseService } from '../../service/guest-course/guest-course.service';
import { Pagination } from '../../../../_shared/components/pagination/pagination';
import { toPaginationModel } from '../../../../../utils/page-data';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';

@Component({
  selector: 'app-course-search',
  imports: [SearchSection, SearchResult, Pagination, SpinnerComponent],
  templateUrl: './course-search.html',
  styleUrl: './course-search.css',
})
export class CourseSearch implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;

  pageData!: PageResponse<CourseLiteProjection>;
  searchTitle: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: GuestCourseService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const title = params['title'] || '';
        this.searchTitle = title;
        const page = params['page'] || '';
        initData<PageResponse<CourseLiteProjection>>(
          this.courseService.findCourse(title, page),
          (pageData) => {
            console.log(pageData);
            this.pageData = pageData;
          },
        );
        
      },
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  get totalElements(): number {
    return this.pageData?.totalElements || 0;
  }

  get paginationModel(): PaginationModel {
    if (!this.pageData) {
      return { currentPage: 1, totalPages: 1 };
    }
    return toPaginationModel(this.pageData);
  }
}

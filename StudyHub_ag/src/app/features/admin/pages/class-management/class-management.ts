import { Component } from '@angular/core';
import { ClassHeader } from './class-header/class-header';
import { ClassSearchbox } from './class-searchbox/class-searchbox';
import { ClassResult } from './class-result/class-result';
import { initData } from '../../../../../utils/init-data';
import { ActivatedRoute } from '@angular/router';
import { AdminClassService } from '../../service/admin-class/admin-class.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-class-management',
  imports: [ClassHeader, ClassSearchbox, ClassResult],
  templateUrl: './class-management.html',
  styleUrl: './class-management.css',
})
export class ClassManagement {
  private queryParamsSubscription!: Subscription;

  filterRequest?: ClassFilterRequest;
  pageData?: PageResponse<ClassAdminResponse>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: AdminClassService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        if (!this.filterRequest) {
          // Định nghĩa filterRequest chính là kiểu FilterAccountRequest
          const { page, ...restParams } = params;
          const filterRequest: ClassFilterRequest = restParams;

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

  initData(filter: ClassFilterRequest, page: string) {
    initData<PageResponse<ClassAdminResponse>>(
      this.classService.filter(filter, page),
      (data) => {
        console.log(data);
        this.pageData = data;
      },
    );
  }

  filter($event: ClassFilterRequest) {
    this.initData($event, '1');
  }
}

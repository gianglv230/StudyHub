import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentHeader } from './student-header/student-header';
import { StudentSearchbox } from './student-searchbox/student-searchbox';
import { StudentResult } from './student-result/student-result';
import { ActivatedRoute, Router } from '@angular/router';
import { initData } from '../../../../../utils/init-data';
import { AdminUserAccountService } from '../../service/admin-user-account/admin-user-account.service';
import { Subscription } from 'rxjs';
import { Empty } from '../../../../_shared/empty/empty';
import { toPaginationModel } from '../../../../../utils/page-data';

@Component({
  selector: 'app-student-management',
  imports: [StudentHeader, StudentSearchbox, StudentResult, Empty],
  templateUrl: './student-management.html',
  styleUrl: './student-management.css',
})
export class StudentManagement implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;

  pageData?: PageResponse<AdminUserAccountBasicResponse>;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;

  filterRequest?: FilterAccountRequest;
  paginationModel?: PaginationModel;

  isStudent: boolean = false;

  constructor(
    private readonly accountService: AdminUserAccountService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    // Ép kiểu ép giá trị trực tiếp từ URL hiện tại của trình duyệt
    this.isStudent = this.router.url.includes('/quan-ly-hoc-vien');

    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        if (!this.filterRequest) {
          // Định nghĩa filterRequest chính là kiểu FilterAccountRequest
          const { page, ...restParams } = params;
          const filterRequest: FilterAccountRequest = restParams;

          // Giờ bạn có thể chấm gọi trực tiếp một cách an toàn
          filterRequest.role = this.isStudent ? 'STUDENT' : 'TEACHER';

          // Ngay lập tức TypeScript sẽ check: Nếu 'STUDENT' không nằm trong kiểu 'Role', nó sẽ báo lỗi ngay!
          this.filterRequest = filterRequest;
        }

        // Nếu trên URL không có page thì mặc định là trang '1' hoặc '' tùy bạn
        const currentPage = params['page'] || '1';

        this.initAccounts(this.filterRequest, currentPage);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  initAccounts(filterRequest: FilterAccountRequest, page: string) {
    initData<PageResponse<AdminUserAccountBasicResponse>>(
      this.accountService.filterAccount(filterRequest, page),
      (data) => {
        console.log(data);
        this.pageData = data;
        this.currentPage = data.currentPage - 1;
        this.pageSize = data.pageSize;
        this.totalPages = data.totalPages;
        this.paginationModel = toPaginationModel(data);
      },
    );
  }

  handleFilter($event: FilterAccountRequest) {
    // Nhận dữ liệu mới
    this.filterRequest! = $event;
    // Giờ bạn có thể chấm gọi trực tiếp một cách an toàn
    this.filterRequest!.role = this.isStudent ? 'STUDENT' : 'TEACHER';

    this.initAccounts(this.filterRequest, '1');
  }
}

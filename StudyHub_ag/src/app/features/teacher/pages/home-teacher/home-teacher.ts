import { Component, OnInit } from '@angular/core';
import { TeacherClassService } from '../../service/teacher-class/teacher-class.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { initData } from '../../../../../utils/init-data';
import { toPaginationModel } from '../../../../../utils/page-data';
import { ClassList } from "../../../../_shared/class-list/class-list";
import { Pagination } from "../../../../_shared/components/pagination/pagination";
import { SpinnerComponent } from "../../../../_shared/spinner/spinner.component";
import { Empty } from "../../../../_shared/empty/empty";

@Component({
  selector: 'app-home-teacher',
  imports: [ClassList, Pagination, SpinnerComponent, Empty, RouterLink],
  templateUrl: './home-teacher.html',
  styleUrl: './home-teacher.css',
})
export class HomeTeacher implements OnInit {
  tab: number = 1;

  switchTab(tab: number) {
    this.tab = tab;
  }

  protected queryParamsSubscription!: Subscription;
  protected pageData!: PageResponse<ClassProgressResponse>;
  protected statusSlected?: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: TeacherClassService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        const page = params['page'] || '1';
        const status = params['status'] || 'ongoing';
        this.statusSlected = status;
        this.initMainData(status, page);
      },
    );
  }

  initMainData(status: string, page: string) {
    initData<PageResponse<ClassProgressResponse>>(
      this.classService.getMyTeacherClass(status, page),
      (data) => {
        console.log(data);
        this.pageData = data;
      },
    );
  }

  get status(): string {
    return this.statusSlected || '';
  }

  get classes(): ClassProgressResponse[] {
    return this.pageData?.data || [];
  }

  get paginationModel(): PaginationModel {
    return toPaginationModel(this.pageData);
  }
}

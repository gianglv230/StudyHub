import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClassesList } from '../classes/classes-list/classes-list';
import { CourseFilter } from '../courses/course-filter/course-filter';
import { ActivatedRoute } from '@angular/router';
import { GuestClassService } from '../../service/guest-class/guest-class.service';
import { initData } from '../../../../../utils/init-data';
import { SpinnerComponent } from '../../../../_shared/spinner/spinner.component';
import { Empty } from '../../../../_shared/empty/empty';
import { Subscription } from 'rxjs';
import { Pagination } from '../../../../_shared/components/pagination/pagination';

@Component({
  selector: 'app-classes-of-teacher',
  imports: [ClassesList, CourseFilter, SpinnerComponent, Empty, Pagination],
  templateUrl: './classes-of-teacher.html',
  styleUrl: './classes-of-teacher.css',
})
export class ClassesOfTeacher implements OnInit, OnDestroy {
  protected queryParamsSubscription!: Subscription;

  classOfTeacher?: ClassOfTeacherResponse;
  targets: string[] = [];
  targetSelected?: string;
  classes: ClassLiteResponse[] = [];

  // pagination
  currentPage = 1;
  readonly maxItemsPerPage = 9;
  totalPages = 0;
  pagination?: PaginationModel;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly classService: GuestClassService,
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        this.currentPage = +(params['page'] || 1);
        const target = params['target'] || '';
        this.targetSelected = target;
        this.initClassesPage(this.currentPage, target);
      },
    );

    const id = this.route.snapshot.paramMap.get('id');
    this.initClassOfTeacher(id);
  }

  get target(): string | undefined{
    return this.targetSelected;
  }

  initClassesPage(page: number, target: string) {
    if (!this.classOfTeacher) return;

    // filter
    let filtered = this.classOfTeacher.classes;

    if (target) {
      filtered = filtered.filter((e) => e.targetGrade === target);
    }

    // total page
    this.totalPages = Math.ceil(filtered.length / this.maxItemsPerPage);

    // pagination
    const start = (page - 1) * this.maxItemsPerPage;
    const end = start + this.maxItemsPerPage;

    this.pagination = {
      currentPage: page,
      totalPages: this.totalPages,
    };

    this.classes = filtered.slice(start, end);
  }

  initClassOfTeacher(id: string | null) {
    if (!id) return;

    initData<ClassOfTeacherResponse>(
      this.classService.getClassOfTeacher(id),
      (data) => {
        this.classOfTeacher = data;

        this.targets = [...new Set(data.classes.map((e) => e.targetGrade))];

        // load lần đầu
        this.initClassesPage(
          this.currentPage,
          this.route.snapshot.queryParamMap.get('target') || '',
        );
      },
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}

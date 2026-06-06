import { Component, Input } from '@angular/core';
import { AdminCourseCard } from "../../../../../_shared/components/admin-course-card/admin-course-card";
import { toPaginationModel } from '../../../../../../utils/page-data';
import { Pagination } from "../../../../../_shared/components/pagination/pagination";
import { Empty } from "../../../../../_shared/empty/empty";

@Component({
  selector: 'app-course-result',
  imports: [AdminCourseCard, Pagination, Empty],
  templateUrl: './course-result.html',
  styleUrl: './course-result.css',
})
export class CourseResult {
  @Input() pageData?: PageResponse<CourseAdminResponse>;

  get pagination(): PaginationModel | null{
    if(!this.pageData) return null;
    return toPaginationModel(this.pageData);
  }
}

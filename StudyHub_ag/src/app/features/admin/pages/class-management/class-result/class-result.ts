import { Component, Input } from '@angular/core';
import { toPaginationModel } from '../../../../../../utils/page-data';
import { AdminClassCard } from "../../../../../_shared/components/admin-class-card/admin-class-card";
import { Empty } from "../../../../../_shared/empty/empty";
import { Pagination } from "../../../../../_shared/components/pagination/pagination";

@Component({
  selector: 'app-class-result',
  imports: [AdminClassCard, Empty, Pagination],
  templateUrl: './class-result.html',
  styleUrl: './class-result.css',
})
export class ClassResult {
  @Input() pageData?: PageResponse<ClassAdminResponse>;

  get pagination(): PaginationModel | null {
    if (!this.pageData) return null;
    return toPaginationModel(this.pageData);
  }
}

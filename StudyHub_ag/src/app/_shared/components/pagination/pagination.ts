import { Component, Input, ViewEncapsulation } from '@angular/core';
import { generatePagination } from '../../../../utils/page-data';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DynamicIcon } from "../dynamic-icon/dynamic-icon";

@Component({
  selector: 'app-pagination',
  imports: [RouterLink, RouterLinkActive, DynamicIcon],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  encapsulation: ViewEncapsulation.None
})
export class Pagination {
  @Input()
  paginationModel!: PaginationModel;

  get nextPage(): number {
    return this.paginationModel.currentPage - 1;
  }

  get prevPage(): number {
    return this.paginationModel.currentPage + 1;
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  // Hiệu ứng active currentPage
  isActive(page: number | string) {
    this.isString(page) ? false : this.paginationModel.currentPage === page;
  }

  // Kiểm tra là string
  isString(page: number | string) {
    return page === 'string';
  }

  // Kiểm tra có page trước không
  hasNextPage() {
    return this.nextPage > 0;
  }

  // Kiểm tra có page sau không
  hasPrevPage() {
    return this.prevPage <= this.paginationModel.totalPages;
  }

  // Tạo danh sách page
  get visiblePages(): (number | string)[] {
    return generatePagination(this.paginationModel);
  }
}

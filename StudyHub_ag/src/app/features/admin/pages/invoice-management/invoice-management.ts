import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceSearchbox } from './invoice-searchbox/invoice-searchbox';
import { InvoiceResult } from './invoice-result/invoice-result';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminInvoiceService } from '../../service/admin-invoice/admin-invoice.service';
import { initData } from '../../../../../utils/init-data';
import { toPaginationModel } from '../../../../../utils/page-data';
import { Empty } from "../../../../_shared/empty/empty";

@Component({
  selector: 'app-invoice-management',
  imports: [InvoiceSearchbox, InvoiceResult, Empty],
  templateUrl: './invoice-management.html',
  styleUrl: './invoice-management.css',
})
export class InvoiceManagement implements OnInit, OnDestroy {
  private queryParamsSubscription!: Subscription;

  pageData?: PageResponse<InvoiceCardResponse>;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;

  filterRequest?: InvoiceFilterRequest;
  paginationModel?: PaginationModel;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly invoiceService: AdminInvoiceService,
  ) {}
  
  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params) => {
        if (!this.filterRequest) {
          // Định nghĩa filterRequest chính là kiểu InvoiceFilterRequest
          const { page, ...restParams } = params;
          const filterRequest: InvoiceFilterRequest = restParams;
          this.filterRequest = filterRequest;
        }

        // Nếu trên URL không có page thì mặc định là trang '1' hoặc '' tùy bạn
        const currentPage = params['page'] || '1';

        this.initInvoices(this.filterRequest, currentPage);
      },
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  initInvoices(filterRequest: InvoiceFilterRequest, page: string) {
      initData<PageResponse<InvoiceCardResponse>>(
        this.invoiceService.filterInvoice(filterRequest, page),
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
    // Giờ bạn có thể chấm gọi trực tiếp một cách an toà

    this.initInvoices(this.filterRequest, '1');
  }

}

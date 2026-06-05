import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminInvoiceService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.INVOICE);
  }

  filterInvoice(
    filterRequest: InvoiceFilterRequest,
    page: string,
  ): Observable<ApiResponse<PageResponse<InvoiceCardResponse>>> {
    // 1. Tạo một object phẳng kết hợp filter và page, đồng thời loại bỏ trường 'page' cũ nếu có trong filterRequest
    const combinedParams: any = { ...filterRequest, page };

    // 2. Lọc bỏ tất cả các key có giá trị null, undefined hoặc chuỗi rỗng ""
    const cleanQueryParams = Object.keys(combinedParams).reduce(
      (acc: any, key: string) => {
        const value = combinedParams[key];

        // Điều kiện: Chỉ giữ lại các giá trị KHÔNG PHẢI null, undefined, và không phải chuỗi rỗng
        if (value !== null && value !== undefined && value !== '') {
          acc[key] = value;
        }

        return acc;
      },
      {},
    );

    return this.customRequest(
      'GET',
      API_ENDPOINTS.INVOICE_ENDPOINTS.FILTER,
      null,
      cleanQueryParams, // Truyền object sạch đã được lọc vào đây
    );
  }

  
}

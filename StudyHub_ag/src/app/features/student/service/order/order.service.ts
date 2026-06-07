import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.ORDER);
  }

  createOrder(id: number): Observable<ApiResponse<any>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.ORDER_ENDPOINTS.CREATE + "/" + id,
    );
  }
}

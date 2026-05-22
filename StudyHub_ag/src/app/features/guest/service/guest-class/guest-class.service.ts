import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestClassService extends BaseService<ClassLiteResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS);
  }

  filterClass(
    page: number,
    subject: string,
    target: string,
    category: string,
  ): Observable<ApiResponse<PageResponse<ClassLiteResponse>>> {
    const params: any = {
      page,
      subject,
      target,
      category,
    };

    // Xóa param null, undefined, ''
    Object.keys(params).forEach((key) => {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === ''
      ) {
        delete params[key];
      }
    });

    return this.customRequest(
      'GET',
      API_ENDPOINTS.CLASS_ENDPOINTS.FILTER,
      null,
      params,
    );
  }

  getClassOfCourse(slug: string): Observable<ApiResponse<ClassLiteResponse[]>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.CLASS_OF_COURSE}/${slug}`,
    );
  }
}

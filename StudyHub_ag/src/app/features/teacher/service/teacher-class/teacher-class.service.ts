import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherClassService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS);
  }

  getMyTeacherClass(
    status: string = 'ongoing',
    page: string = '1',
  ): Observable<ApiResponse<PageResponse<ClassProgressResponse>>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.CLASS_ENDPOINTS.TEACHER_LIST,
      null,
      {
        status: status,
        page: page,
      },
    );
  }
}

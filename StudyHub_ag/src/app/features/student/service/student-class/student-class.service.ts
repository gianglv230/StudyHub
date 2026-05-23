import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentClassService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.CLASS);
  }

  getMyStudentClass(): Observable<ApiResponse<ClassProgressResponse>> {
    return this.customRequest('GET', API_ENDPOINTS.CLASS_ENDPOINTS.STUDENT_LIST);
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCourseService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.COURSE);
  }

  getAdminCourse(
    courseSlug: string,
  ): Observable<ApiResponse<AdminCourseResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN + '/' + courseSlug,
    );
  }

  addCourse(
    request: AddCourseRequest,
  ): Observable<ApiResponse<AdminCourseResponse>> {
    return this.customRequest(
      'POST',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN,
      request,
    );
  }

  updateCourse(
    request: UpdateCourseRequest,
  ): Observable<ApiResponse<AdminCourseResponse>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN,
      request,
    );
  }

  deleteCourse(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'DELETE',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN + '/' + id,
    );
  }
}

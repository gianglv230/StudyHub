import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../guest/service/teacher/teacher.service';

@Injectable({
  providedIn: 'root',
})
export class AdminClassService extends BaseService<CourseLiteProjection> {
  constructor(
    http: HttpClient,
    private readonly teacherService: TeacherService,
  ) {
    super(http, API_ENDPOINTS.CLASS);
  }

  getTeacherList() {
    return this.teacherService.getTeacherList();
  }

  getAdminClass(
    classSlug: string,
  ): Observable<ApiResponse<AdminClassResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN}/${classSlug}`,
    );
  }

  addClass(
    request: AddClassRequest,
  ): Observable<ApiResponse<AdminClassResponse>> {
    return this.customRequest(
      'POST',
      API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN,
      request,
    );
  }

  updateClass(
    request: UpdateClassRequest,
  ): Observable<ApiResponse<AdminClassResponse>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN,
      request,
    );
  }

  deleteClass(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest('DELETE', API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN);
  }

  getAdminClassInfo(
    classSlug: string,
  ): Observable<ApiResponse<AdminClassInfoResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_CLASS_INFO}/${classSlug}`,
    );
  }

  openClass(classSlug: string): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_OPEN}/${classSlug}`,
    );
  }

  closeClass(classSlug: string): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_CLOSE}/${classSlug}`,
    );
  }

  updateStatusClass(
    request: UpdateClassStatusRequest,
  ): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_STATUS,
      request,
    );
  }
}

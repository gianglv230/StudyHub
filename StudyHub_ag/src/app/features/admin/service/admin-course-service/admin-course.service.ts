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

  filter(
    filterRequest: CourseFilterRequest,
    page: string = '1',
  ): Observable<ApiResponse<PageResponse<CourseAdminResponse>>> {
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

    return this.customRequest<PageResponse<CourseAdminResponse>>(
      'GET',
      API_ENDPOINTS.COURSE_ENPOINTS.ADMIN_FILTER,
      null,
      { ...cleanQueryParams, page },
    );
  }
}

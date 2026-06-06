import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable, Subject } from 'rxjs';
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
    courseSlug: string,
  ): Observable<ApiResponse<AdminClassResponse>> {
    return this.customRequest(
      'GET',
      `${API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN}/${courseSlug}`,
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
    return this.customRequest('DELETE', API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN + "/" + id);
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

  // Định nghĩa luồng sự kiện refresh
  private classRefreshSubject = new Subject<void>();
  classRefresh$ = this.classRefreshSubject.asObservable();
  triggerRefreshClass() {
    this.classRefreshSubject.next();
  }

  filter(
    filterRequest: ClassFilterRequest,
    page: string = '1',
  ): Observable<ApiResponse<PageResponse<ClassAdminResponse>>> {
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

    return this.customRequest<PageResponse<ClassAdminResponse>>(
      'GET',
      API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_FILTER,
      null,
      { ...cleanQueryParams, page },
    );
  }

  getClassAdminOfCourse(
    courseSlug: string,
    page: string = '1',
  ): Observable<ApiResponse<PageResponse<ClassAdminResponse>>> {
    return this.customRequest<PageResponse<ClassAdminResponse>>(
      'GET',
      API_ENDPOINTS.CLASS_ENDPOINTS.ADMIN_CLASS_OF_COURSE + "/" + courseSlug,
      null,
      {
        page: page
      }
    );
  }
}

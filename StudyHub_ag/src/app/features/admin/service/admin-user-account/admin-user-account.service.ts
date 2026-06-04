import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminUserAccountService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.USER_ACCOUNT);
  }

  filterAccount(
    filterRequest: FilterAccountRequest,
    page: string,
  ): Observable<ApiResponse<PageResponse<AdminUserAccountBasicResponse>>> {
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
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN_FILTER,
      null,
      cleanQueryParams, // Truyền object sạch đã được lọc vào đây
    );
  }

  getUserAccount(
    id: number,
  ): Observable<ApiResponse<AdminUserAccountBasicResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN + '/' + id,
    );
  }

  addUserAccount(
    request: FormData,
  ): Observable<ApiResponse<AdminUserAccountBasicResponse>> {
    return this.customRequest(
      'POST',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN,
      request,
    );
  }

  updateUserAccount(
    request: FormData,
  ): Observable<ApiResponse<AdminUserAccountBasicResponse>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN,
      request,
    );
  }

  delUserAccount(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'DELETE',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN + '/' + id,
    );
  }

  lockUserAccount(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN_LOCK + '/' + id,
    );
  }

  unLockUserAccount(id: number): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN_UNLOCK + '/' + id,
    );
  }

  resetPwd(request: ChangePasswordRequest): Observable<ApiResponse<Boolean>> {
    return this.customRequest(
      'PATCH',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN_RESET_PWD,
      request,
    );
  }
}

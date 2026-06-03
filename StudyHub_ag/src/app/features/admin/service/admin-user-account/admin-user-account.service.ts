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

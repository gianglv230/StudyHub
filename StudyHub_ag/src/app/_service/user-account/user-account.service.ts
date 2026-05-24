import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';
import { API_ENDPOINTS } from '../base/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService extends BaseService<CourseLiteProjection> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.USER_ACCOUNT);
  }

  getMyInfo(): Observable<ApiResponse<UserAccountBasicResponse>> {
    return this.customRequest(
      'GET',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.MY_INFO,
    );
  }

  changePwd(request: ChangePasswordRequest): Observable<ApiResponse<boolean>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.CHANGE_PWD,
      request,
    );
  }

  updateMyUserAccount(
    request: UpdateMyUserAccountRequest,
  ): Observable<ApiResponse<UserAccountBasicResponse>> {
    return this.customRequest(
      'PUT',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.UPDATE_MY_ACCOUNT,
      request
    );
  }
}

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

  getUserAccount(id: number): Observable<ApiResponse<UserAccountBasicResponse>>{
    return this.customRequest(
      'GET',
      API_ENDPOINTS.USER_ACCOUNT_ENPOINT.ADMIN + "/" + id
    )
  }
}

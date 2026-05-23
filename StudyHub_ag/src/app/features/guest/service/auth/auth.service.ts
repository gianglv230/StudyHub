import { Injectable } from '@angular/core';
import { BaseService } from '../../../../_service/base/base.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../../_service/base/api-endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<AuthenticationResponse> {
  constructor(http: HttpClient) {
    super(http, API_ENDPOINTS.AUTH);
  }

  login(
    account: UserAccountRequest,
  ): Observable<ApiResponse<AuthenticationResponse>> {
    return this.customRequest<AuthenticationResponse>(
      'POST',
      API_ENDPOINTS.AUTH_ENDPOINTS.TOKEN,
      account,
    );
  }
}

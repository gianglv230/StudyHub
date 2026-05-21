import { Injectable } from "@angular/core";
import { BaseService } from "../../../../_service/base/base.service";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "../../../../_service/base/api-endpoints";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TeacherService extends BaseService<TeacherLiteResponse>{
    constructor(http: HttpClient){
        super(http, API_ENDPOINTS.TEACHER)
    }

    getTeacherList(): Observable<ApiResponse<TeacherLiteResponse>>{
        return this.customRequest(
            "GET",
            API_ENDPOINTS.TEACHER_ENDPOINTS.LIST
        );
    }
}
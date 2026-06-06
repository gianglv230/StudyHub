import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Generic base service class providing common HTTP CRUD operations.
 * 
 * @template TList - Type of the resource for fetching/listing.
 * @template TCreate - Type of the resource used for creation (defaults to TList).
 * @template TUpdate - Type of the resource used for update (defaults to TList).
 */
export abstract class BaseService<TList, TCreate = TList, TUpdate = TList> {
  protected baseUrl: string;

  /**
   * Initializes the service with HttpClient and API endpoint path.
   * @param http HttpClient instance for HTTP requests
   * @param endpoint API endpoint path (appended to base API URL)
   */
  constructor(protected http: HttpClient, endpoint: string) {
    this.baseUrl = `${environment.apiUrl}${endpoint}`;
  }

  /**
   * Retrieves all resources.
   * @returns Observable of an array of TList items.
   */
  getAll() {
    return this.http.get<ApiResponse<TList[]>>(this.baseUrl);
  }

  /**
   * Retrieves a single resource by its ID.
   * @param id Resource identifier (number or string)
   * @returns Observable of a single TList item.
   */
  getById(id: number | string) {
    return this.http.get<ApiResponse<TList>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new resource.
   * @param data The resource data to create.
   * @returns Observable of the created resource of type TCreate.
   */
  create(data: TCreate) {
    return this.http.post<ApiResponse<TCreate>>(this.baseUrl, data);
  }

  /**
   * Updates an existing resource identified by ID.
   * @param id Resource identifier to update.
   * @param data The updated resource data.
   * @returns Observable of the updated resource of type TUpdate.
   */
  update(id: number | string, data: TUpdate) {
    return this.http.put<ApiResponse<TUpdate>>(`${this.baseUrl}/${id}`, data);
  }

  /**
   * Deletes a resource by its ID.
   * @param id Resource identifier to delete.
   * @returns Observable of void.
   */
  delete(id: number | string) {
    return this.http.delete<ApiResponse<Boolean>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Sends a custom HTTP request with specified method, path, body and parameters.
   * Useful for endpoints that do not follow standard CRUD patterns.
   * 
   * @template R The expected response type.
   * @param method HTTP method ('GET' | 'POST' | 'PUT' | 'DELETE')
   * @param path Relative path appended to the baseUrl
   * @param body Optional request body
   * @param params Optional query parameters
   * @returns Observable of the response with type R
   */
  customRequest<R>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    body?: any,
    params?: any
  ) {
    const url = `${this.baseUrl}${path}`;
    return this.http.request<ApiResponse<R>>(method, url, { body, params });
  }

  // customRequest2<R>(
  //   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  //   path: string,
  //   body?: any,
  //   params?: any
  // ) {
  //   const url = `${environment.apiUrl}${path}`;
  //   return this.http.request<ApiResponse<R>>(method, url, { body, params });
  // }

}

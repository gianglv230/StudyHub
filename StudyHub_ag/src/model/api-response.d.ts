interface ApiResponse<T> {
    code: number = 0;
    message: string;
    data: T;
    error: FieldErrorDetail[]
}

interface FieldErrorDetail {
  field: string;
  message: string;
}

interface PageResponse<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  data: T[]
}
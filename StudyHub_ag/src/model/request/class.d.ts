interface AddClassRequest {
  slug: string;
  teacherId: number; // Lưu ý ở Response trước teacherId là String, ở Request này là Integer -> number
  className: string;
  thumbnailId: number;
  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  price: number;
  maxStudents: number;
  courseSlug: string;
}

interface UpdateClassRequest {
  slug: string;
  teacherId: number; // Lưu ý ở Response trước teacherId là String, ở Request này là Integer -> number
  className: string;
  thumbnailId: number;
  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  price: number;
  maxStudents: number;
  id: number;
}

interface UpdateClassStatusRequest {
  classSlug: string;
  status: ClassStatus;
}

interface ClassFilterRequest {
  subject?: string;
  targetGrade?: string;
  categoryName?: string;
  status?: string;
  fromDate?: string | Date; // LocalDate của Java thường map thành chuỗi 'YYYY-MM-DD' hoặc đối tượng Date
  toDate?: string | Date;
  courseName?: string;
  emptyStatus?: string;
  teacherId?: number;
  className?: string;
}

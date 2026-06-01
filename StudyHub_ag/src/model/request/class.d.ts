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

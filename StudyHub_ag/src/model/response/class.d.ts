interface ClassLiteResponse {
  classId: number;
  slug: string;

  teacherId: string;
  teacherName: string;

  subject: string;
  targetGrade: string;
  categoryName: string;

  className: string;

  thumbnail: string;

  openingDate: Date;
  startDate: Date;
  endDate: Date;
  classSchedule: string;
  availableSlots: number;
  price: number;
}

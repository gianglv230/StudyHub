type EnrollmentStatus = 'ACTIVE' | 'SUSPENDED' | 'CANCELLED'

interface StudentInClassResponse {
  id: number;
  enrollmentId: number;
  firstName: string;
  lastName: string;
  gender: boolean;
  dateOfBirth: Date; // Hoặc Date nếu bạn tự động parse trong interceptor
  status: EnrollmentStatus;
  numberOfPresents: number;
  numberOfAbsents: number;
}
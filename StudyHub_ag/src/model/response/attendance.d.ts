interface StudentAttendanceRowResponse {
  sessionDate: string;
  status: string;
  note: string;
}

interface StudentAttendanceResponse {
  studentName: string;
  className: string;
  attendances: StudentAttendanceRowResponse[];
}

interface SessionDateResponse {
  className: string;
  teacherName: string;
  sessionDates: Date[];
}

interface AttendanceRowResponse {
  id: number;
  studentId: number;
  studentName: string;
  dateOfBirth: string;
  status: string;
  note?: string;
}

interface AttendanceEnrollmentResponse {
  enrollmentId: number;
  studentName: string;
  dateOfBirth: Date;
}

interface AddAttendanceRequest {
  enrollmentId: number;
  status: string;
  note: string;
}

interface UpdateAttendanceRequest {
  id: number;
  status: string;
  note: string;
}

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

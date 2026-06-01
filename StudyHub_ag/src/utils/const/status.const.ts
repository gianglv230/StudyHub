export const CourseStatusMap: Record<CourseStatus, string> = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Không hoạt động',
};

export const ClassStatusMap: Record<ClassStatus, string> = {
  UPCOMING: 'Sắp diễn ra',
  ONGOING: 'Đang diễn ra',
  FINISHED: 'Đã kết thúc',
  CANCELED: 'Đã bị hủy',
};

export const ClassStatusColorMap: Record<ClassStatus, string> = {
  UPCOMING: 'text-primary-container',
  ONGOING: 'text-success',
  FINISHED: 'text-warning',
  CANCELED: 'text-danger',
};

export const EnrollmentStatusMap: Record<EnrollmentStatus, string> = {
  ACTIVE: 'Đang học',
  CANCELLED: 'Đã hủy',
  SUSPENDED: 'Bị đình chỉ'
}

export const EnrollmentStatusColorMap: Record<EnrollmentStatus, string> = {
  ACTIVE: 'bg-success',
  CANCELLED: 'bg-danger',
  SUSPENDED: 'bg-warning'
}
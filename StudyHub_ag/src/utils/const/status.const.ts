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

export const ClassStatusOptions: ComboboxRow[] = Object.entries(
  ClassStatusMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const ClassStatusColorMap: Record<ClassStatus, string> = {
  UPCOMING: 'text-primary-container',
  ONGOING: 'text-success',
  FINISHED: 'text-warning',
  CANCELED: 'text-danger',
};

export const EnrollmentStatusMap: Record<EnrollmentStatus, string> = {
  ACTIVE: 'Đang học',
  CANCELED: 'Đã hủy',
  SUSPENDED: 'Bị đình chỉ',
};

export const EnrollmentStatusColorMap: Record<EnrollmentStatus, string> = {
  ACTIVE: 'bg-success',
  CANCELED: 'bg-danger',
  SUSPENDED: 'bg-warning',
};

export const InvoiceStatusLiteMap: Record<InvoiceStatusLite, string> = {
  PENDING: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
};

export const InvoiceStatusLiteOptions: ComboboxRow[] = Object.entries(
  InvoiceStatusLiteMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));

export const InvoiceMethodMap: Record<InvoiceMethod, string> = {
  CASH: 'Tiền mặt',
  BANK: 'Chuyển khoản',
};

export const InvoiceMethodOptions: ComboboxRow[] = Object.entries(
  InvoiceMethodMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));

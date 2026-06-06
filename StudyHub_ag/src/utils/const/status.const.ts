export const CourseStatusMap: Record<CourseStatus, string> = {
  ACTIVE: 'Hoạt động',
  DRAFT: 'Không hoạt động',
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

type AccountStatus = 'ACTIVE' | 'INACTIVE';

export const AccountStatusMap: Record<AccountStatus, string> = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Bị khóa',
};


//Filter

type AccountStatusFilter = 'ACTIVE' | 'INACTIVE' | '';

export const AccountStatusFilterMap: Record<AccountStatusFilter, string> = {
  ACTIVE: 'Hoạt động',
  INACTIVE: 'Bị khóa',
  '': 'Tất cả',
};

export const AccountStatusFilterOptions: ComboboxRow[] = Object.entries(
  AccountStatusFilterMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));


// Invoice filter


export const InvoiceTypeMap: Record<InvoiceType, string> = {
  PAYMENT: 'Đóng học',
  REFUND: 'Hoàn tiền'
};

export const InvoiceStatusMap: Record<InvoiceStatus, string> = {
  PENDING: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  OVERDUE: 'Quá hạn',
  REFUNDED: 'Hoàn tiền',
  CANCELED: 'Hủy'
};

type InvoiceStatusFilter = ''| 'PENDING' | 'PAID';

export const InvoiceStatusFilterMap: Record<InvoiceStatusFilter, string> = {
  PENDING: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  '': 'Tất cả',
};

export const InvoiceStatusFilterOptions: ComboboxRow[] = Object.entries(
  InvoiceStatusFilterMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));

type AvailableFilter = ''| 'FULL' | 'AVAILABLE';

export const AvailableStatusFilterMap: Record<AvailableFilter, string> = {
  FULL: 'Đầy',
  AVAILABLE: 'Trống',
  '': 'Tất cả',
};

export const AvailableStatusFilterOptions: ComboboxRow[] = Object.entries(
  AvailableStatusFilterMap,
).map(([key, value]) => ({
  label: value,
  value: key,
}));
export const STATUS_INVOICE: Record<string, string> = {
  PENDING: 'Chưa thanh toán',
  PAID: 'Đã thanh toán',
  OVERDUE: 'Quá hạn',
  REFUNDED: 'Đã hoàn tiền',
  CANCELED: 'Đã hủy',
};

export const CLASS_STATUS_INVOICE: Record<string, string> = {
  PENDING: 'bg-info',
  PAID: 'bg-success',
  OVERDUE: 'bg-danger',
  REFUNDED: 'bg-primary',
  CANCELED: 'bg-warning',
};

export const TYPE_INVOICE: Record<string, string> = {
  PAYMENT: 'Đóng học',
  REFUND: 'Hoàn tiền',
};

export const METHOD_INVOICE: Record<string, string> = {
  CASH: 'Tiền mặt',
  BANK: 'Chuyển khoản',
};

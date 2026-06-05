type InvoiceType = 'PAYMENT' | 'REFUND';

interface InvoiceCardResponse {
  invoiceId: number;

  dueDate: string;
  amount: number;
  adjustments: number;
  finalAmount: number;
  orderCode: number;
  paidAt: string;
  method: string;
  type: string;
  createdAt: string;

  createdBy: number;
  createdByUser: string;
  className: string;
  studentName: string;

  status: InvoiceStatus;
  classSlug: string;
}

interface InvoiceFilterRequest {
  invoiceId?: number | null;
  status?: string | null;
  dueDate?: Date | null; // Thường là string dạng 'YYYY-MM-DD' khi gửi qua API
  orderCode?: string | null;
  studentId?: number | null;
  classId?: number | null;
  fromDate?: Date | null;
  toDate?: Date | null;
}

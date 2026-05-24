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

  status: string;
  classSlug: string;
}

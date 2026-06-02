type InvoiceMethod = 'CASH' | 'BANK';
type InvoiceStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'REFUNDED' | 'CANCELED';

type InvoiceStatusLite = 'PENDING' | 'PAID';
type InvoiceStatusLight = 'PENDING' | 'PAID' | 'REFUNDED';

// type EnrollmentStatus = 'ACTIVE' | 'SUSPENDED' | 'CANCELED';

interface AddStudentRequest {
  amount: number;
  adjustments: number;
  method: InvoiceMethod | null;
  studentId: number;
  classSlug: string;
  status: InvoiceStatusLite;
  dueDate: Date;
}

interface SuspendStudentRequest {
  amount: number;
  adjustments: number;
  method: InvoiceMethod;
  enrollmentId: number;
}

interface TransferStudentRequest {
  amount: number;
  adjustments: number;
  method: InvoiceMethod;
  studentId: number;
  enrollmentId: number;
  newClassSlug: string;
  status: InvoiceStatus;
  dueDate: Date;
}
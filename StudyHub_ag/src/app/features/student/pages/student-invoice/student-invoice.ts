import { Component, OnInit } from '@angular/core';
import { StudentInvoiceService } from '../../service/student-invoice/student-invoice.service';
import { initData } from '../../../../../utils/init-data';
import { InvoiceCard } from '../../components/invoice-card/invoice-card';
import { Empty } from "../../../../_shared/empty/empty";

@Component({
  selector: 'app-student-invoice',
  imports: [InvoiceCard, Empty],
  templateUrl: './student-invoice.html',
  styleUrl: './student-invoice.css',
})
export class StudentInvoice implements OnInit {
  isPaidTab = true;

  unpaidInvoices: InvoiceCardResponse[] = [];
  paidInvoices: InvoiceCardResponse[] = [];

  constructor(private readonly invoiceService: StudentInvoiceService) {}

  ngOnInit(): void {
    initData<InvoiceCardResponse[]>(
      this.invoiceService.getMyStudentInvoice(),
      (data) => {
        console.log(data);
        this.unpaidInvoices = data.filter(
          (item) => item.status === 'PENDING' || item.status === 'OVERDUE',
        );

        this.paidInvoices = data.filter(
          (item) => item.status === 'PAID' || item.status === 'REFUNDED',
        );
      },
    );
  }

  switchTab(isPaidTab: boolean) {
    this.isPaidTab = isPaidTab;
  }
}

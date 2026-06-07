import { Component, OnInit } from '@angular/core';
import { StudentInvoiceService } from '../../service/student-invoice/student-invoice.service';
import { initData } from '../../../../../utils/init-data';
import { InvoiceCard } from '../../components/invoice-card/invoice-card';
import { Empty } from '../../../../_shared/empty/empty';
import { OrderService } from '../../service/order/order.service';
import { BaseComponent } from '../../../../_shared/components/base/base-component';

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

  constructor(
    private readonly invoiceService: StudentInvoiceService,
    private readonly orderService: OrderService,
    private readonly base: BaseComponent,
  ) {}

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

  handlePaid($event: number) {
    this.orderService.createOrder($event).subscribe({
      next: (res) => {
        if (res.code === 0) {
          if (res.data) {
            console.log(res.data);

            // Giả sử API Spring Boot trả về object có chứa checkoutUrl
            const externalUrl = res.data.checkoutUrl;

            // CHUYỂN HƯỚNG RA WEBSITE NGOÀI (Thay thế trang hiện tại)
            window.location.href = externalUrl;

            // HOẶC NẾU MUỐN MỞ TRONG THẺ MỚI (NEW TAB):
            // window.open(externalUrl, '_blank');
          } else {
            // Successful response but no data returned

            this.base.showDanger('Không trả về dữ liệu');
          }
        }
      },
      error: (err) => {
        this.base.handleError(err);
      },
    });
  }
}

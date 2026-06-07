import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CLASS_STATUS_INVOICE,
  METHOD_INVOICE,
  STATUS_INVOICE,
  TYPE_INVOICE,
} from '../../../../../utils/const/invoice.const';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-card',
  imports: [RouterLink, DatePipe, DecimalPipe],
  templateUrl: './invoice-card.html',
  styleUrl: './invoice-card.css',
})
export class InvoiceCard {
  
  @Input()
  invoice?: InvoiceCardResponse;

  @Output() paidEvent = new EventEmitter<number>();

  get unPaid(): boolean {
    const status = this.invoice?.status || '';
    return status == 'PENDING' || status == 'OVERDUE';
  }

  get statusStype(): string {
    const status = this.invoice?.status || '';
    return CLASS_STATUS_INVOICE[status] || '';
  }

  get status(): string {
    return STATUS_INVOICE[this.invoice?.status || ''] || '';
  }

  get typeInvoice(): string {
    return TYPE_INVOICE[this.invoice?.type || ''] || '';
  }

  get methodPaid(): string {
    return METHOD_INVOICE[this.invoice?.method || ''] || '';
  }

  goPaid() {
    this.paidEvent.emit(this.invoice?.invoiceId);
  }
}

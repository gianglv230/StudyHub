import { Component } from '@angular/core';
import { InvoiceSearchbox } from "./invoice-searchbox/invoice-searchbox";
import { InvoiceResult } from "./invoice-result/invoice-result";

@Component({
  selector: 'app-invoice-management',
  imports: [InvoiceSearchbox, InvoiceResult],
  templateUrl: './invoice-management.html',
  styleUrl: './invoice-management.css',
})
export class InvoiceManagement {

}

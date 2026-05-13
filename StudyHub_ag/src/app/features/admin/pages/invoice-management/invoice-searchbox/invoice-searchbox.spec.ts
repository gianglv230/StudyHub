import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSearchbox } from './invoice-searchbox';

describe('InvoiceSearchbox', () => {
  let component: InvoiceSearchbox;
  let fixture: ComponentFixture<InvoiceSearchbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSearchbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSearchbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

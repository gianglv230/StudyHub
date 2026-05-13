import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInvoice } from './student-invoice';

describe('StudentInvoice', () => {
  let component: StudentInvoice;
  let fixture: ComponentFixture<StudentInvoice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentInvoice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentInvoice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

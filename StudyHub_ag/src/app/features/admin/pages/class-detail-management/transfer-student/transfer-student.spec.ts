import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferStudent } from './transfer-student';

describe('TransferStudent', () => {
  let component: TransferStudent;
  let fixture: ComponentFixture<TransferStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

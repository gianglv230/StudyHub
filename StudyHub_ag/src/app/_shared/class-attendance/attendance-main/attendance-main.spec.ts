import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMain } from './attendance-main';

describe('AttendanceMain', () => {
  let component: AttendanceMain;
  let fixture: ComponentFixture<AttendanceMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

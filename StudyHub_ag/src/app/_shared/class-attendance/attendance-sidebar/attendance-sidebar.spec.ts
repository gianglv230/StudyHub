import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSidebar } from './attendance-sidebar';

describe('AttendanceSidebar', () => {
  let component: AttendanceSidebar;
  let fixture: ComponentFixture<AttendanceSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

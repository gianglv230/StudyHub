import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttendance } from './class-attendance';

describe('ClassAttendance', () => {
  let component: ClassAttendance;
  let fixture: ComponentFixture<ClassAttendance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassAttendance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassAttendance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

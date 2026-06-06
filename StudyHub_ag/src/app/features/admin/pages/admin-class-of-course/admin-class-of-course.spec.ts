import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClassOfCourse } from './admin-class-of-course';

describe('AdminClassOfCourse', () => {
  let component: AdminClassOfCourse;
  let fixture: ComponentFixture<AdminClassOfCourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClassOfCourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClassOfCourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

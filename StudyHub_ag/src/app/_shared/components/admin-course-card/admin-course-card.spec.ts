import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseCard } from './admin-course-card';

describe('AdminCourseCard', () => {
  let component: AdminCourseCard;
  let fixture: ComponentFixture<AdminCourseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCourseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

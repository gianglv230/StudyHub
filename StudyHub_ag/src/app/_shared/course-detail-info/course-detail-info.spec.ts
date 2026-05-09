import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailInfo } from './course-detail-info';

describe('CourseDetailInfo', () => {
  let component: CourseDetailInfo;
  let fixture: ComponentFixture<CourseDetailInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

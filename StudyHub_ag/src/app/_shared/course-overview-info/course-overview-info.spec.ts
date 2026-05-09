import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewInfo } from './course-overview-info';

describe('CourseOverviewInfo', () => {
  let component: CourseOverviewInfo;
  let fixture: ComponentFixture<CourseOverviewInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseOverviewInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseOverviewInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

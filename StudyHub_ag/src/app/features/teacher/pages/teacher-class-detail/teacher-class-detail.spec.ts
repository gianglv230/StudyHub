import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherClassDetail } from './teacher-class-detail';

describe('TeacherClassDetail', () => {
  let component: TeacherClassDetail;
  let fixture: ComponentFixture<TeacherClassDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherClassDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherClassDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

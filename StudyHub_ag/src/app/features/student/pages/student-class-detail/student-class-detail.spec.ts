import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentClassDetail } from './student-class-detail';

describe('StudentClassDetail', () => {
  let component: StudentClassDetail;
  let fixture: ComponentFixture<StudentClassDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentClassDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentClassDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

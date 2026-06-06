import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAccountManagement } from './teacher-account-management';

describe('TeacherAccountManagement', () => {
  let component: TeacherAccountManagement;
  let fixture: ComponentFixture<TeacherAccountManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAccountManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAccountManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

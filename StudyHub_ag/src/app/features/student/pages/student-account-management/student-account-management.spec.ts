import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountManagement } from './student-account-management';

describe('StudentAccountManagement', () => {
  let component: StudentAccountManagement;
  let fixture: ComponentFixture<StudentAccountManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAccountManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAccountManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

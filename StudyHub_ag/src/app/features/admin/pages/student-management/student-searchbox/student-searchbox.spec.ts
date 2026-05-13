import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearchbox } from './student-searchbox';

describe('StudentSearchbox', () => {
  let component: StudentSearchbox;
  let fixture: ComponentFixture<StudentSearchbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSearchbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSearchbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherResourceManagement } from './teacher-resource-management';

describe('TeacherResourceManagement', () => {
  let component: TeacherResourceManagement;
  let fixture: ComponentFixture<TeacherResourceManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherResourceManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherResourceManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLessons } from './class-lessons';

describe('ClassLessons', () => {
  let component: ClassLessons;
  let fixture: ComponentFixture<ClassLessons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLessons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLessons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonMinor } from './lesson-minor';

describe('LessonMinor', () => {
  let component: LessonMinor;
  let fixture: ComponentFixture<LessonMinor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonMinor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonMinor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

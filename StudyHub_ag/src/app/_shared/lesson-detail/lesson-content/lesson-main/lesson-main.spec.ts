import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonMain } from './lesson-main';

describe('LessonMain', () => {
  let component: LessonMain;
  let fixture: ComponentFixture<LessonMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonMain]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

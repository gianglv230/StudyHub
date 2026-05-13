import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassResult } from './class-result';

describe('ClassResult', () => {
  let component: ClassResult;
  let fixture: ComponentFixture<ClassResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

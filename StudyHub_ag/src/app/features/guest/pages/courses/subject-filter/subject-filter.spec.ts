import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFilter } from './subject-filter';

describe('SubjectFilter', () => {
  let component: SubjectFilter;
  let fixture: ComponentFixture<SubjectFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

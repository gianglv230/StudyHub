import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLiteCard } from './course-lite-card';

describe('CourseLiteCard', () => {
  let component: CourseLiteCard;
  let fixture: ComponentFixture<CourseLiteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLiteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseLiteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

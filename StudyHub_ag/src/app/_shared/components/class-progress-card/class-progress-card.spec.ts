import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassProgressCard } from './class-progress-card';

describe('ClassProgressCard', () => {
  let component: ClassProgressCard;
  let fixture: ComponentFixture<ClassProgressCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassProgressCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassProgressCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLiteCard } from './class-lite-card';

describe('ClassLiteCard', () => {
  let component: ClassLiteCard;
  let fixture: ComponentFixture<ClassLiteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassLiteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassLiteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

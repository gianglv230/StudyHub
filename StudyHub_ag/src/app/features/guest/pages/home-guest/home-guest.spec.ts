import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGuest } from './home-guest';

describe('HomeGuest', () => {
  let component: HomeGuest;
  let fixture: ComponentFixture<HomeGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

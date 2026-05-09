import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGuest } from './navbar-guest';

describe('NavbarGuest', () => {
  let component: NavbarGuest;
  let fixture: ComponentFixture<NavbarGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

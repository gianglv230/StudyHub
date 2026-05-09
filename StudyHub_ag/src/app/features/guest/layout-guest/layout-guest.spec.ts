import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutGuest } from './layout-guest';

describe('LayoutGuest', () => {
  let component: LayoutGuest;
  let fixture: ComponentFixture<LayoutGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

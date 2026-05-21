import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicIcon } from './dynamic-icon';

describe('DynamicIcon', () => {
  let component: DynamicIcon;
  let fixture: ComponentFixture<DynamicIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

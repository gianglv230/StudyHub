import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoField } from './info-field';

describe('InfoField', () => {
  let component: InfoField;
  let fixture: ComponentFixture<InfoField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

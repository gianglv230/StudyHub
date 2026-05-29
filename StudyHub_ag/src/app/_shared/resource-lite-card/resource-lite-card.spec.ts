import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceLiteCard } from './resource-lite-card';

describe('ResourceLiteCard', () => {
  let component: ResourceLiteCard;
  let fixture: ComponentFixture<ResourceLiteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceLiteCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceLiteCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

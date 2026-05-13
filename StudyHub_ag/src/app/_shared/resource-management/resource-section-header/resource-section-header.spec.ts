import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSectionHeader } from './resource-section-header';

describe('ResourceSectionHeader', () => {
  let component: ResourceSectionHeader;
  let fixture: ComponentFixture<ResourceSectionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceSectionHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceSectionHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

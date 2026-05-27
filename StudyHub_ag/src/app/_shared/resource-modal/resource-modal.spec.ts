import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceModal } from './resource-modal';

describe('ResourceModal', () => {
  let component: ResourceModal;
  let fixture: ComponentFixture<ResourceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

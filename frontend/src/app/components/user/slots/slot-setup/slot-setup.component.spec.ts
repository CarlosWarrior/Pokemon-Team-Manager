import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotSetupComponent } from './slot-setup.component';

describe('SlotSetupComponent', () => {
  let component: SlotSetupComponent;
  let fixture: ComponentFixture<SlotSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlotSetupComponent]
    });
    fixture = TestBed.createComponent(SlotSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

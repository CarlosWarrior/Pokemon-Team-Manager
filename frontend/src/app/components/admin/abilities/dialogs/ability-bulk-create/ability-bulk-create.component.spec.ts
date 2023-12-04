import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilityBulkCreateComponent } from './ability-bulk-create.component';

describe('AbilityBulkCreateComponent', () => {
  let component: AbilityBulkCreateComponent;
  let fixture: ComponentFixture<AbilityBulkCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilityBulkCreateComponent]
    });
    fixture = TestBed.createComponent(AbilityBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

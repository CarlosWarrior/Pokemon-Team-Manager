import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTargetDialogComponent } from './select-target-dialog.component';

describe('SelectTargetDialogComponent', () => {
  let component: SelectTargetDialogComponent;
  let fixture: ComponentFixture<SelectTargetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectTargetDialogComponent]
    });
    fixture = TestBed.createComponent(SelectTargetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

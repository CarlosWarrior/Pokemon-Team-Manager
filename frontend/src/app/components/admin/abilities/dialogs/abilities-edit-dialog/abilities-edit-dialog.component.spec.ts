import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesEditDialogComponent } from './abilities-edit-dialog.component';

describe('AbilitiesEditDialogComponent', () => {
  let component: AbilitiesEditDialogComponent;
  let fixture: ComponentFixture<AbilitiesEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilitiesEditDialogComponent]
    });
    fixture = TestBed.createComponent(AbilitiesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

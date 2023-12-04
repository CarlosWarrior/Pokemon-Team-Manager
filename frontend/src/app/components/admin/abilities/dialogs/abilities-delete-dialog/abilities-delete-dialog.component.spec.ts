import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesDeleteDialogComponent } from './abilities-delete-dialog.component';

describe('AbilitiesDeleteDialogComponent', () => {
  let component: AbilitiesDeleteDialogComponent;
  let fixture: ComponentFixture<AbilitiesDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilitiesDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(AbilitiesDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveEditDialogComponent } from './move-edit-dialog.component';

describe('MoveEditDialogComponent', () => {
  let component: MoveEditDialogComponent;
  let fixture: ComponentFixture<MoveEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveEditDialogComponent]
    });
    fixture = TestBed.createComponent(MoveEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

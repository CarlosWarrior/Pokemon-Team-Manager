import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveDeleteDialogComponent } from './move-delete-dialog.component';

describe('MoveDeleteDialogComponent', () => {
  let component: MoveDeleteDialogComponent;
  let fixture: ComponentFixture<MoveDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(MoveDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

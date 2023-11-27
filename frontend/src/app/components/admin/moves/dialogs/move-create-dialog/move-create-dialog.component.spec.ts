import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCreateDialogComponent } from './move-create-dialog.component';

describe('MoveCreateDialogComponent', () => {
  let component: MoveCreateDialogComponent;
  let fixture: ComponentFixture<MoveCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveCreateDialogComponent]
    });
    fixture = TestBed.createComponent(MoveCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

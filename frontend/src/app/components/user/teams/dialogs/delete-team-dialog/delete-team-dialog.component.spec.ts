import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTeamDialogComponent } from './delete-team-dialog.component';

describe('DeleteTeamDialogComponent', () => {
  let component: DeleteTeamDialogComponent;
  let fixture: ComponentFixture<DeleteTeamDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTeamDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitiesCreateDialogComponent } from './abilities-create-dialog.component';

describe('AbilitiesCreateDialogComponent', () => {
  let component: AbilitiesCreateDialogComponent;
  let fixture: ComponentFixture<AbilitiesCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbilitiesCreateDialogComponent]
    });
    fixture = TestBed.createComponent(AbilitiesCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

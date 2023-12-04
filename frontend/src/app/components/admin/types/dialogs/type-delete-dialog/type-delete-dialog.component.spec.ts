import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDeleteDialogComponent } from './type-delete-dialog.component';

describe('TypeDeleteDialogComponent', () => {
  let component: TypeDeleteDialogComponent;
  let fixture: ComponentFixture<TypeDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(TypeDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

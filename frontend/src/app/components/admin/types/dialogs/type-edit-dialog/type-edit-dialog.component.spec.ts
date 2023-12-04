import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditDialogComponent } from './type-edit-dialog.component';

describe('TypeEditDialogComponent', () => {
  let component: TypeEditDialogComponent;
  let fixture: ComponentFixture<TypeEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEditDialogComponent]
    });
    fixture = TestBed.createComponent(TypeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

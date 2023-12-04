import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCreateDialogComponent } from './type-create-dialog.component';

describe('TypeCreateDialogComponent', () => {
  let component: TypeCreateDialogComponent;
  let fixture: ComponentFixture<TypeCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeCreateDialogComponent]
    });
    fixture = TestBed.createComponent(TypeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

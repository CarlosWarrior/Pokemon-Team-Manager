import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBulkCreateComponent } from './type-bulk-create.component';

describe('TypeBulkCreateComponent', () => {
  let component: TypeBulkCreateComponent;
  let fixture: ComponentFixture<TypeBulkCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeBulkCreateComponent]
    });
    fixture = TestBed.createComponent(TypeBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

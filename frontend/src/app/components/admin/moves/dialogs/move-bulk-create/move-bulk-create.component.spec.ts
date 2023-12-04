import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBulkCreateComponent } from './move-bulk-create.component';

describe('MoveBulkCreateComponent', () => {
  let component: MoveBulkCreateComponent;
  let fixture: ComponentFixture<MoveBulkCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoveBulkCreateComponent]
    });
    fixture = TestBed.createComponent(MoveBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

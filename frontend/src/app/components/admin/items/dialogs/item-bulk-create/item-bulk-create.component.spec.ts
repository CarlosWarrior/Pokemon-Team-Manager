import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBulkCreateComponent } from './item-bulk-create.component';

describe('ItemBulkCreateComponent', () => {
  let component: ItemBulkCreateComponent;
  let fixture: ComponentFixture<ItemBulkCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemBulkCreateComponent]
    });
    fixture = TestBed.createComponent(ItemBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

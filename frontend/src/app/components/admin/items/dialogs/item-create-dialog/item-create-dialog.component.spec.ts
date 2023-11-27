import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCreateDialogComponent } from './item-create-dialog.component';

describe('ItemCreateDialogComponent', () => {
  let component: ItemCreateDialogComponent;
  let fixture: ComponentFixture<ItemCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCreateDialogComponent]
    });
    fixture = TestBed.createComponent(ItemCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

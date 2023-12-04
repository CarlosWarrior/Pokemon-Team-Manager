import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPokemonDialogComponent } from './select-pokemon-dialog.component';

describe('SelectPokemonDialogComponent', () => {
  let component: SelectPokemonDialogComponent;
  let fixture: ComponentFixture<SelectPokemonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectPokemonDialogComponent]
    });
    fixture = TestBed.createComponent(SelectPokemonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

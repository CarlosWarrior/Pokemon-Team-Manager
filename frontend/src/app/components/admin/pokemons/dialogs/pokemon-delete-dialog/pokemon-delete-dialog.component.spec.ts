import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDeleteDialogComponent } from './pokemon-delete-dialog.component';

describe('PokemonDeleteDialogComponent', () => {
  let component: PokemonDeleteDialogComponent;
  let fixture: ComponentFixture<PokemonDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(PokemonDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

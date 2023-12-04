import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCreateDialogComponent } from './pokemon-create-dialog.component';

describe('PokemonCreateDialogComponent', () => {
  let component: PokemonCreateDialogComponent;
  let fixture: ComponentFixture<PokemonCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCreateDialogComponent]
    });
    fixture = TestBed.createComponent(PokemonCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

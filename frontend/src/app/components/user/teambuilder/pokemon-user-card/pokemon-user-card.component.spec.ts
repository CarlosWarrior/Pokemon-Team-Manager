import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonUserCardComponent } from './pokemon-user-card.component';

describe('PokemonUserCardComponent', () => {
  let component: PokemonUserCardComponent;
  let fixture: ComponentFixture<PokemonUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonUserCardComponent]
    });
    fixture = TestBed.createComponent(PokemonUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

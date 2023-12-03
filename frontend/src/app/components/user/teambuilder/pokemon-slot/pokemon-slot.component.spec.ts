import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSlotComponent } from './pokemon-slot.component';

describe('PokemonSlotComponent', () => {
  let component: PokemonSlotComponent;
  let fixture: ComponentFixture<PokemonSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonSlotComponent]
    });
    fixture = TestBed.createComponent(PokemonSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

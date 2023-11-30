import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAdminCardComponent } from './pokemon-admin-card.component';

describe('PokemonAdminCardComponent', () => {
  let component: PokemonAdminCardComponent;
  let fixture: ComponentFixture<PokemonAdminCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonAdminCardComponent]
    });
    fixture = TestBed.createComponent(PokemonAdminCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

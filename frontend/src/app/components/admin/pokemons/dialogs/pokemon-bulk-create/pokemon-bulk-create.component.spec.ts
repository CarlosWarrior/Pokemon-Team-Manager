import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBulkCreateComponent } from './pokemon-bulk-create.component';

describe('PokemonBulkCreateComponent', () => {
  let component: PokemonBulkCreateComponent;
  let fixture: ComponentFixture<PokemonBulkCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonBulkCreateComponent]
    });
    fixture = TestBed.createComponent(PokemonBulkCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

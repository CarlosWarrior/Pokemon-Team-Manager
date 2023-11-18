import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeambuilderComponent } from './teambuilder.component';

describe('TeambuilderComponent', () => {
  let component: TeambuilderComponent;
  let fixture: ComponentFixture<TeambuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeambuilderComponent]
    });
    fixture = TestBed.createComponent(TeambuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

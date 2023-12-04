import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSetupComponent } from './team-setup.component';

describe('TeamSetupComponent', () => {
  let component: TeamSetupComponent;
  let fixture: ComponentFixture<TeamSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamSetupComponent]
    });
    fixture = TestBed.createComponent(TeamSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

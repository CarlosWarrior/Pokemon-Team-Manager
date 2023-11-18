import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterTokenComponent } from './admin-register-token.component';

describe('AdminRegisterTokenComponent', () => {
  let component: AdminRegisterTokenComponent;
  let fixture: ComponentFixture<AdminRegisterTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRegisterTokenComponent]
    });
    fixture = TestBed.createComponent(AdminRegisterTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

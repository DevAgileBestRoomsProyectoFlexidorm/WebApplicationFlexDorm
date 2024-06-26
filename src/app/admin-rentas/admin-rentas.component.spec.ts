import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentasComponent } from './admin-rentas.component';

describe('AdminRentasComponent', () => {
  let component: AdminRentasComponent;
  let fixture: ComponentFixture<AdminRentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

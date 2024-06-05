import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasStudentComponent } from './reservas-student.component';

describe('ReservasStudentComponent', () => {
  let component: ReservasStudentComponent;
  let fixture: ComponentFixture<ReservasStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservasStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

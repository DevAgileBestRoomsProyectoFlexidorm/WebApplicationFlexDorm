import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsArrenderComponent } from './statistics-arrender.component';

describe('StatisticsArrenderComponent', () => {
  let component: StatisticsArrenderComponent;
  let fixture: ComponentFixture<StatisticsArrenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsArrenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsArrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

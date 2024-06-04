import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomActiveComponent } from './room-active.component';

describe('RoomActiveComponent', () => {
  let component: RoomActiveComponent;
  let fixture: ComponentFixture<RoomActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

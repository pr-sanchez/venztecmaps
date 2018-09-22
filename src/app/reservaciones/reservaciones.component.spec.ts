import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservacionesComponent } from './reservaciones.component';

describe('ReservacionesComponent', () => {
  let component: ReservacionesComponent;
  let fixture: ComponentFixture<ReservacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

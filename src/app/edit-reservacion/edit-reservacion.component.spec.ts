import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservacionComponent } from './edit-reservacion.component';

describe('EditReservacionComponent', () => {
  let component: EditReservacionComponent;
  let fixture: ComponentFixture<EditReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

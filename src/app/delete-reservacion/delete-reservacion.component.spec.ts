import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReservacionComponent } from './delete-reservacion.component';

describe('DeleteReservacionComponent', () => {
  let component: DeleteReservacionComponent;
  let fixture: ComponentFixture<DeleteReservacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteReservacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

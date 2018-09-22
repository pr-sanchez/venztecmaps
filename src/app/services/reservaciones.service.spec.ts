import { TestBed, inject } from '@angular/core/testing';

import { ReservacionesService } from './reservaciones.service';

describe('ReservacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservacionesService]
    });
  });

  it('should be created', inject([ReservacionesService], (service: ReservacionesService) => {
    expect(service).toBeTruthy();
  }));
});

import { Component, OnInit } from '@angular/core';
import { ReservacionesService } from '../services/reservaciones.service'
@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {

  // reservaciones: FirebaseListObservable<any[]>;
  todasReservaciones: any;
  constructor( private reservacionesService: ReservacionesService) {//db: AngularFireDatabase
    // this.reservaciones = db.list('/messages');
    // this.reservaciones.subscribe(reservaciones => {
    //   this.todasReservaciones = reservaciones;
    //   console.log(this.todasReservaciones);
    // })
    // console.log(this.reservaciones);
   }

  ngOnInit() {
    this.reservacionesService.getReservaciones().subscribe(reservaciones => {
      this.todasReservaciones = reservaciones;
    });
  }

  sortReservaciones(prop: string) {//sort data (-date) descending, (date) ascending
    const sorted = this.todasReservaciones.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    // asc/desc
    if (prop.charAt(0) === '-') { sorted.reverse(); }
    return sorted;
}

}

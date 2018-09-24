import { Component, OnInit } from '@angular/core';
import { ReservacionesService } from "../services/reservaciones.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-delete-reservacion',
  templateUrl: './delete-reservacion.component.html',
  styleUrls: ['./delete-reservacion.component.css']
})
export class DeleteReservacionComponent implements OnInit {
  id: any;
  reservacionName: any;
  reservacionMessage: any;
  constructor(private reservacionesService: ReservacionesService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
     // get the reservacion ID
     this.id = this.route.snapshot.params['id'];
     this.reservacionesService.getReservacionDetails(this.id).subscribe(reservacion => {
       this.reservacionName = reservacion.name;
       this.reservacionMessage = reservacion.message;
     });
  }

  removeReservacion(){
    this.reservacionesService.deleteReservacion(this.id);
    alert("Reservation deleted succesfully!");
    this.router.navigate(['/reservaciones']);
  }

}






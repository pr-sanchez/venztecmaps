import { Component, OnInit } from '@angular/core';
import { ReservacionesService } from "../services/reservaciones.service";
import { Router,ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-edit-reservacion',
  templateUrl: './edit-reservacion.component.html',
  styleUrls: ['./edit-reservacion.component.css']
})
export class EditReservacionComponent implements OnInit {
  id;
  name;
  email;
  date;
  phone;
  people;
  country;
  date1;
  date2;
  isChecked;
  message;


  constructor( private reservacionesService: ReservacionesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.reservacionesService.getReservacionDetails(this.id).subscribe(reservacion => {
    this.name= reservacion.name;
    this.email= reservacion.email;
    this.date= reservacion.date;
    this.date1= new Date(reservacion.date1);
    this.date2= new Date(reservacion.date2);
    this.phone= reservacion.phone;
    this.people= reservacion.people;
    this.country= reservacion.country;
    this.isChecked= reservacion.isChecked;
    this.message= reservacion.message;
  });

  }

  updateDate1(date){
    this.date1 = this.reservacionesService.formatDate(date);
  }

  updateDate2(date){
    this.date2 = this.reservacionesService.formatDate(date);
  }

  submitEdit(){
    let reservacion = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      date1: this.date1,
      date2: this.date2,
      isChecked: this.isChecked,
      people: this.people,
      country: this.country,
      message: this.message
    }

    this.reservacionesService.editReservacion(this.id, reservacion);
    alert("Reservation edited succesfully!");
    this.router.navigate(['/reservaciones'])
  }
}

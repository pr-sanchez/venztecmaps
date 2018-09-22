import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthorizationService } from './authorization.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Reservacion } from "../interfaces/Reservacion";


@Injectable()
export class ReservacionesService {
  reservaciones: FirebaseListObservable<any[]>;
  userRoles: Array<string>;
  reservacionDetails: FirebaseObjectObservable<any>; //from Firebase


  constructor( private db:AngularFireDatabase, private http: Http, auth: AuthorizationService) {
    auth.user.map(user => {
      return this.userRoles = _.keys(_.get(user, 'roles'))
    })
    .subscribe()
  }

  getReservaciones(){
    this.reservaciones = this.db.list('/messages') as FirebaseListObservable<any[]>;
    return this.reservaciones;
  }


  getReservacionDetails(id){
    this.reservacionDetails = this.db.object('/messages/'+id) as FirebaseObjectObservable<Reservacion>;
    return this.reservacionDetails;
  }

  updateReservacion(id, reservacionDetails){
    var filteredReservacion = JSON.parse(JSON.stringify(reservacionDetails)); //removes the undefined fields

    if(this.canEdit){
      return this.reservaciones.update(id,filteredReservacion);
    }
    else{
      console.log('acción prevenida!')
    }

  }

  addReservacion(reservacionDetails){
    var filteredReservacion = JSON.parse(JSON.stringify(reservacionDetails)); //removes the undefined fields
    console.log('Filtered Reservacion - ',filteredReservacion);
    return this.reservaciones.push(filteredReservacion);
  }

  deleteReservacion(id){
      return this.reservaciones.remove(id);
  }

  formatDate(date: Date): string {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
}

  // get canRead(): boolean{
  //     const allowed = ['admin', 'author', 'reader']
  //     return this.matchingRole(allowed)
  // }

  get canEdit(): boolean{
       const allowed = ['admin']
       return this.matchingRole(allowed)
  }

  get canDelete(): boolean{
       const allowed = ['admin']
      return this.matchingRole(allowed)
  }

  private matchingRole(allowedRoles): boolean{
      return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }


}

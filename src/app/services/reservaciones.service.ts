import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Reservacion } from "../interfaces/Reservacion";
import { User } from '../interfaces/user';

@Injectable()
export class ReservacionesService {
  user$: Observable<User>;
  reservaciones: FirebaseListObservable<any[]>;
  userRoles: Array<string>;
  reservacionDetails: FirebaseObjectObservable<any>; //from Firebase


  constructor( private db:AngularFireDatabase, private http: Http, auth: AuthService) {
    auth.user$.map(user => {
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



  addReservacion(reservacionDetails){
    var filteredReservacion = JSON.parse(JSON.stringify(reservacionDetails)); //removes the undefined fields
    console.log('Filtered Reservacion - ',filteredReservacion);
    return this.reservaciones.push(filteredReservacion);
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


       ///// Authorization Logic /////

      get canRead(): boolean {
        const allowed = ['admin', 'subscriber']
        return this.matchingRole(allowed)
      }

      get canEdit(): boolean {
        const allowed = ['admin']
        return this.matchingRole(allowed)
      }

      get canCreate(): boolean {
        const allowed = ['admin']
        return this.matchingRole(allowed)
      }

      get canDelete(): boolean {
        const allowed = ['admin']
        return this.matchingRole(allowed)
      }


      /// Helper to determine if any matching roles exist
      private matchingRole(allowedRoles): boolean {
        return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
      }


      //// User Actions

      editReservacion(id, reservacionDetails) {
        if ( this.canEdit ) {
          var filteredReservacion = JSON.parse(JSON.stringify(reservacionDetails)); //removes the undefined fields
          return this.reservaciones.update(id,filteredReservacion);
        }
        else console.log('acción prevenida!')
      }

      deleteReservacion(id) {
        if ( this.canDelete ) {
            return this.reservaciones.remove(id);
        }
        else console.log('action prevented!')
      }


}

import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from '../services/auth.service';


@Injectable()
export class LugaresService{
    API_ENDPOINT = 'https://venztecmaps-1516388139367.firebaseio.com';
    lugares:any;
    detalleslugar: FirebaseObjectObservable<any>;
    userRoles: Array<string>; // roles of currently logged in user

    constructor(private afDB:AngularFireDatabase, private http: Http, auth: AuthService){//, auth: AuthorizationService
        auth.user$.map(user => {
            return this.userRoles = _.keys(_.get(user, 'roles'))
          })
          .subscribe()
    }

    public getLugares(){
        // return this.afDB.list('lugares/');
            return this.http.get(this.API_ENDPOINT+'/.json')
            .map((resultado)=>{
                const data = resultado.json().lugares;
                return data;
            })
    }

    public buscarLugar(id){
        return this.lugares.filter((lugar) => { return lugar.id == id})[0] || null;
    }

    getDetallesLugar(id){
        this.detalleslugar = this.afDB.object('/lugares/'+id) as FirebaseObjectObservable<any>;
        return this.detalleslugar;
      }

    // public guardarLugar(lugar){
    //     this.afDB.database.ref('lugares/'+lugar.id).set(lugar);

    // //     const headers = new Headers({"Content-Type":"application/json"});
    // //     return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, {headers:headers}).subscribe();
    // }

    // public editarLugar(lugar){
    //     this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    // }




    public obtenerGeoData(direccion){
        //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Maracay,Venezuela
        return this.http.get('https://maps.google.com/maps/api/geocode/json?address='+direccion+"&key=<YOUR-API>");
    }

    public getLugar(id){
        return this.lugares = this.afDB.object('lugares/'+id);
    }

    // borrarLugar(id){
    //   this.lugares = this.afDB.object('lugares/'+id);
    //   return this.lugares.remove();
    //   //  this.lugares.remove(id);
    //   }




       ///// Authorization Logic /////

  get canCreate(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  get canRead(): boolean {
    const allowed = ['admin', 'subscriber']
    return this.matchingRole(allowed)
  }

  get canEdit(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }

  get canView(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }


  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }


  //// User Actions

  createLugar(lugar){
    if ( this.canCreate ) {
      this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    }
    else console.log('action prevented!')
  }

  editLugar(lugar) {
    if ( this.canEdit ) {
      return this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
    }
    else console.log('action prevented!')
  }

  deleteLugar(id) {
    if ( this.canDelete ) {
      this.lugares = this.afDB.object('lugares/'+id);
      return this.lugares.remove();
    }
    else console.log('action prevented!')
  }


}

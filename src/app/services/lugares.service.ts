import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
// import { AuthorizationService } from './authorization.service';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class LugaresService{
    API_ENDPOINT = 'https://venztecmaps-1516388139367.firebaseio.com';
    userRoles: Array<string>;
    lugares:any;
    detalleslugar: FirebaseObjectObservable<any>;


    constructor(private afDB:AngularFireDatabase, private http: Http){//, auth: AuthorizationService
        // auth.user.map(user => {
        //     return this.userRoles = _.keys(_.get(user, 'roles'))
        //   })
        //   .subscribe()
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

    public guardarLugar(lugar){
        this.afDB.database.ref('lugares/'+lugar.id).set(lugar);

    //     const headers = new Headers({"Content-Type":"application/json"});
    //     return this.http.post(this.API_ENDPOINT+'/lugares.json', lugar, {headers:headers}).subscribe();
    }

    public editarLugar(lugar){
      if(this.canEdit){
        this.afDB.database.ref('lugares/'+lugar.id).set(lugar);
      } else{
        console.log('acción prevenida!')
      }
    }




    public obtenerGeoData(direccion){
        //http://maps.google.com/maps/api/geocode/json?address=9-55+calle+72,+Maracay,Venezuela
        return this.http.get('http://maps.google.com/maps/api/geocode/json?address='+direccion);
    }

    public getLugar(id){
        return this.lugares = this.afDB.object('lugares/'+id);
    }

    borrarLugar(id){
      this.lugares = this.afDB.object('lugares/'+id);
      return this.lugares.remove();
      //  this.lugares.remove(id);
      }

    get canRead(): boolean{
        const allowed = ['admin', 'reader']
        return this.matchingRole(allowed)
    }

    get canEdit(): boolean{
         const allowed = ['admin', 'reader']
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

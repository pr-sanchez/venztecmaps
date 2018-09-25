import { Component } from '@angular/core';
import {LugaresService} from "../services/lugares.service";
import {ActivatedRoute} from "@angular/router";
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import {FormControl} from "@angular/forms";
import {Http} from "@angular/http";

@Component({
    selector: 'app-crear',
    templateUrl: './crear.component.html',
    styleUrls: ['./crear.component.css']

})
export class CrearComponent {
    lugar:any = {};
    id:any = null;
    results$: Observable<any>;
    private searchField: FormControl;
    boMostrarMensaje = false;
    mensajeSuccess = null;

    constructor(private lugaresService: LugaresService, private route: ActivatedRoute, private http: Http){
        this.id = this.route.snapshot.params['id'];
        if(this.id != 'new'){
            this.lugaresService.getLugar(this.id)
                .subscribe((lugar)=>{//.valueChanges() antes del subscribe en nuevas versiones
                    this.lugar = lugar;
                });
        }
        const URL = 'https://maps.google.com/maps/api/geocode/json';
        const API = '&key=AIzaSyD-SbaVLhWBto55sNpOTiEZJp41s9m9jXY';
        this.searchField = new FormControl();
        this.results$ = this.searchField.valueChanges
            .debounceTime(1000)
            .switchMap(query => this.http.get(`${URL}?address=${query}${API}`))
            .map(response => response.json())//map era para formatear la respuesta del servicio y no tener que procesar tanto al llamarlo
            .map(response => response.results);
        }
        seleccionarDireccion(result){
            console.log(result);
            const addressComponents = result.address_components
            const adrressParams: any = {}
            for (let i = 0, len = addressComponents.length; i < len; i++) {
              const type = addressComponents[i].types[0].toString()
              switch (type) {
                case'street_number':
                  adrressParams.street_number = addressComponents[i].short_name
                  break
                // case'route':
                //   adrressParams.route = addressComponents[i].short_name
                //   break
                case'locality':
                  adrressParams.locality = addressComponents[i].long_name
                  break
                case'country':
                  adrressParams.country = addressComponents[i].long_name
                  break
              }
            }

            this.lugar.calle = this.lugar.nombre+' '+adrressParams.street_number //adrressParams.street_number
            this.lugar.ciudad = adrressParams.locality
            this.lugar.pais = adrressParams.country

        }
    guardarLugar(){
        var direccion = this.lugar.calle+','+this.lugar.ciudad+','+this.lugar.pais;
        this.lugaresService.obtenerGeoData(direccion)
            .subscribe((result) => {
                this.lugar.lat = result.json().results[0].geometry.location.lat;
                this.lugar.lng = result.json().results[0].geometry.location.lng;

                if(this.id != 'new'){
                    this.lugaresService.editLugar(this.lugar);
                    alert('Negocio editado con éxito!');
                }else{
                    this.lugar.id = Date.now();
                    this.lugaresService.createLugar(this.lugar);
                    this.boMostrarMensaje = true;
                    this.mensajeSuccess ='Negocio guardado con éxito!';
                }
                this.lugar = {};
            });
    }


    public cerrarMensaje(){
    this.boMostrarMensaje = false;
    this.mensajeSuccess = '';
    }
}

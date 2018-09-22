import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LugaresService } from '../services/lugares.service';
import { GeoService } from '../services/geo.service';




@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']

})
export class DetalleComponent implements OnInit{
  id:any;
  lugar: any = {}; //objeto vacio
  lugares = null;
  boMostrarMensaje = false;
  mensajeError = null;
  state = 'inicial';
  subscription: any;
  lat:number;
  lng:number;

  public customStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 33
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2e5d4"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5dac6"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c5c6c6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e4d7c6"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbfaf7"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#acbcc9"
            }
        ]
    }
];

  constructor(private lugaresService:LugaresService, private geo: GeoService, private router: Router, private route: ActivatedRoute){
    lugaresService.getLugares()
    .subscribe(lugares => {
      this.lugares = lugares;
      var me = this;
      me.lugares = Object.keys(me.lugares).map(function (key) {return me.lugares[key];
      });
      this.state = 'final';
    }, error => {
      this.boMostrarMensaje = true;
      this.mensajeError ='El recurso web no fue localizado ('+ error.statusText+')';
    });


    this.id = this.route.snapshot.params['id'];
    this.lugaresService.getDetallesLugar(this.id).subscribe(lugar =>{
      this.lugar.nombre=lugar.nombre,
      this.lugar.establecimiento=lugar.establecimiento,
      this.lugar.descripcion=lugar.descripcion,
      this.lugar.plan=lugar.plan,
      this.lugar.facebook=lugar.facebook,
      this.lugar.twitter=lugar.twitter,
      this.lugar.web=lugar.web,
      this.lugar.calle=lugar.calle,
      this.lugar.ciudad=lugar.ciudad,
      this.lugar.pais=lugar.pais,
      this.lugar.ciudad=lugar.ciudad,
      this.lugar.estrella=lugar.estrella,
      this.lugar.foto=lugar.foto,
      this.lugar.lat=lugar.lat,
      this.lugar.lng=lugar.lng
    })
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.getUserLocation()
    this.subscription = this.geo.hits
        .subscribe(hits => this.lugares = hits)

  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private getUserLocation(){
    if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.geo.getLocations(100, [this.lat, this.lng])
    });
    }
  }


  public cerrarMensaje(){
    this.boMostrarMensaje = false;
    this.mensajeError = '';
  }


}


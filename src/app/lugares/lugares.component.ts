import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { GeoService } from '../services/geo.service';
import { ShareButtons } from '@ngx-share/core';



@Component({
  selector: 'app-lugares',  //tag de html que va a reconocer angular para poder insertar este componente
  templateUrl: './lugares.component.html', //archivo html que va a usar este componente
  styleUrls: ['./lugares.component.css'],
  animations: [
    trigger('contenedorAnimable', [
      state('inicial', style({
        opacity: 0
        // backgroundColor: 'green',
        // transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1
        // backgroundColor: 'yellow',
        // transform: 'rotate3d(5,10,30,20deg)'
      })),
      transition('inicial => final', animate(2000)),
      transition('final => inicial', animate(1000))
    ])
  ]
})



export class LugaresComponent implements OnInit{

    title = 'VenztecMaps';
    lat:number;
    // =10.2530953
    lng:number;
    // =-67.5936895
    lugares = null;
    lugar = null;
    boMostrarMensaje = false;
    mensajeError = null;
    state = 'inicial';
    locationChosen = false;

    markers: any;
    subscription: any;
    // coords:number=null;
    // infoWindowOpened = null;

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


  onChoseLocation(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }
  //EVENTO QUE USO PARA QUE SE POSICIONE DONDE DE CLICK Y TENGA MEJOR NAVEGACION

  animar(){
    this.state = (this.state == 'final') ? 'inicial' : 'final';
  }

  // animacionInicia(e){
  //   console.log('Iniciado!');
  //   console.log(e);
  // }
  // animacionTermina(e){
  //   console.log('Terminado!');
  //   console.log(e);
  // }

// private afDB:AngularFireDatabase,
  constructor( private lugaresService: LugaresService, private geo: GeoService, public share: ShareButtons){

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
  }

  // var options = {
  //  types: ['(cities)'],
  //  componentRestrictions: {country: "us"}
  // };


  ngOnInit() {
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



likeMe(i) {
    if (this.lugares[i].liked == 0)
      this.lugares[i].liked = 1;
    else
      this.lugares[i].liked = 0;
  }



//
// var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
// var beachMarker = new google.maps.Marker({
//   map: map,
//   icon: image
// });
// }
}

// function  calculateAndDisplayRoute(){
//     directionsDisplay.setMap(map);
//     directionsService.route({
//         origin: marker.getPosition(),
//         destination: newMarker.getPosition(),
//         travelMode: google.maps.TravelMode.DRIVING
//     }, function (response, status){
//         if (status == google.maps.DirectionsStatus.OK){
//             directionsDisplay.setDirections(response);
//     } else{
//         window.alert('Directions request failed due to ' + status);
//     })

//         }
// }



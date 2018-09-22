import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from "./directives/resaltar.directive";
import { ContarClicksDirective } from "./directives/contador-clicks.directive";
import { Routes, RouterModule } from "@angular/router";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CrearComponent } from "./crear/crear.component";
import { LinkifystrPipe } from "./pipes/linkifystr.pipe";
import { DynamicContent }  from "./directives/dynamic-content.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatCheckboxModule, MatGridListModule, MatInputModule, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

//Http
import { HttpModule } from "@angular/http";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//share buttons
import { ShareButtonsModule } from '@ngx-share/buttons';

//Forms
import { FormsModule, ReactiveFormsModule} from "@angular/forms"


//Components
import { NavbarComponent } from './navbar/navbar.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { DetalleComponent } from "./detalle/detalle.component";
import { LugaresComponent } from "./lugares/lugares.component";
import { ContactoComponent } from "./contacto/contacto.component";
// import { FormUploadComponent } from './form-upload/form-upload.component';
// import { UploadsListComponent } from './uploads-list/uploads-list.component';
// import { UploadDetailComponent } from './upload-detail/upload-detail.component';
import { EditReservacionComponent } from './edit-reservacion/edit-reservacion.component';
import { DeleteReservacionComponent } from './delete-reservacion/delete-reservacion.component';
import { DeleteLugarComponent } from './delete-lugar/delete-lugar.component';

//Modules
// import { AppRoutingModule } from './app-routing.module'

//Services
import {LugaresService} from "./services/lugares.service";
import { GeoService } from "./services/geo.service";
// import { UploadFileService } from "./services/uploadfile.service";
import { AuthorizationService } from './services/authorization.service'
import { ReservacionesService } from './services/reservaciones.service'
import { AuthService } from './services/auth.service'




//firebase configuration
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { LoginPageComponent } from './login-page/login-page.component';







const appRoutes : Routes = [
  {path: '', component: LugaresComponent},
  {path: 'lugares', component: LugaresComponent},
  {path: 'detalle/:id', component: DetalleComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'crear/:id', component: CrearComponent},
  {path: 'reservaciones', component: ReservacionesComponent},
  {path: 'edit-reservacion/:id', component: EditReservacionComponent},
  {path:'delete-reservacion/:id', component: DeleteReservacionComponent},
  {path:'delete-lugar/:id', component: DeleteLugarComponent},
  {path: 'login', component: LoginPageComponent}





];
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBQ1F6d0gP_SCMuHBQVt3mGTReuL3baRMQ",
    authDomain: "venztecmaps-1516388139367.firebaseapp.com",
    databaseURL: "https://venztecmaps-1516388139367.firebaseio.com",
    storageBucket: "venztecmaps-1516388139367.appspot.com",
    messagingSenderId: "767470847086"
  }
};
//cada componente debe estar atado a un modulo para que sean funcionales, ejemplo modulo RRHH, tiene tres componentes llamados pagos, empleados e incidencias
@NgModule({//un componente de cada app de a4 es por ejemplo si hago una pag cada una de las vistas deberia ser un componente por buena practica
  declarations: [  //componentes, nos representan una seccion de nuestra app en nuestro modulo, puede ser la pag de contactos, o nosotros, cada una va a ser un componente que ira aqui
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    DynamicContent,
    // FormUploadComponent,
    // UploadsListComponent,
    // UploadDetailComponent,
    NavbarComponent,
    ReservacionesComponent,
    EditReservacionComponent,
    DeleteReservacionComponent,
    DeleteLugarComponent,
    LoginPageComponent
    // AppRoutingModule
  ],
  imports: [  //llamamos los modulos que vamos a ocupar para nuestra aplicacion
    BrowserModule,
    // HttpModule,
     FormsModule,
     AgmCoreModule.forRoot({
  apiKey: 'AIzaSyB6T1XN1ryjOVtyf_fu48QuWWYRXdh0xXk'
}),
     RouterModule.forRoot(appRoutes),
     AngularFireModule.initializeApp(environment.firebase),
 // imports firebase/app needed for everything
     // AngularFireModule.initializeApp(firebaseConfig),
     AngularFirestoreModule, // imports firebase/firestore, only needed for database features
     AngularFireDatabaseModule,
     AngularFireAuthModule, // imports firebase/auth, only needed for auth features
     HttpModule,
     BrowserAnimationsModule,
     MatButtonModule,
     MatMenuModule,
     MatCardModule,
     MatToolbarModule,
     MatIconModule,
     MatCheckboxModule,
     MatGridListModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatProgressSpinnerModule,
     MatTabsModule,
     MatListModule,
     AgmSnazzyInfoWindowModule,
     ReactiveFormsModule,
     HttpClientModule,       // for share counts
     HttpClientJsonpModule,  // for linkedin and tumblr share counts
     ShareButtonsModule.forRoot()

  ],
  providers: [LugaresService, GeoService, AuthorizationService, ReservacionesService, AuthService], //aqui ponemos los servicios que vamos a necesitar para nuestra app
  bootstrap: [AppComponent] //aqui solo colocamos con cual componente vamos a iniciar
})
export class AppModule { }

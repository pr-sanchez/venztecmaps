import { Component, OnInit, Output, Input } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from './user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';


@Component({
  selector: 'app-root',  //tag de html que va a reconocer angular para poder insertar este componente
  templateUrl: './app.component.html', //archivo html que va a usar este componente
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  form: FormGroup;
  user: BehaviorSubject<User> = new BehaviorSubject(null)
  authenticated: boolean = false;
  loggedUser:any= null;
  profilePhoto:any = null;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router:Router, private fb: FormBuilder) {
    this.createForm();

    this.afAuth.authState
        .switchMap(auth => {
          if (auth) {
            /// signed in
            this.authenticated = true;
            return this.db.object('users/' + auth.uid)

          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(user => {
          this.user.next(user)
          this.loggedUser = this.user.value.email;
          this.profilePhoto = this.user.value.photoURL;
          console.log(this.loggedUser);
          console.log(this.profilePhoto);

        })
    }



    createForm() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        message: ['', Validators.required],
      });
    }
    onSubmit() {
      const {name, email, message} = this.form.value;
      const date = Date();
      const html = `
        <div>From: ${name}</div>
        <div>Email: <a href="mailto:${email}">${email}</a></div>
        <div>Date: ${date}</div>
        <div>Message: ${message}</div>
      `;
      let formRequest = { name, email, message, date, html };
      this.db.list('/messages').push(formRequest);
      this.form.reset();
    }

    ngOnInit() {
    }
    ///// SignIn - SignOut Process /////
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.afAuth.auth.signInWithPopup(provider)
        .then(credential =>  {
            this.updateUser(credential.user)
        })
        .then((result)=>{
          this.authenticated = true;
          console.log('Signed in successfully!');
        }).catch((error)=>{
          this.authenticated = false;
          console.log('Error signing in: ',error);
        });
    }



    signOut() {
      this.afAuth.auth.signOut()
      .then((result)=>{
        this.router.navigate(['']).then(function(){
          window.location.reload();
          this.authenticated = false;
        });
        console.log('You were logged out successfully!');
      }).catch((error) =>{
        this.authenticated = true;
        console.log('Error signing out: ',error);
      })
    }
    //// Update user data ////
    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateUser(authData) {
      const userData = new User(authData)
      const ref = this.db.object('users/' + authData.uid)
      ref.take(1)
         .subscribe(user => {
          if (!user.role) {
            ref.update(userData)
          }
      })
    }



}

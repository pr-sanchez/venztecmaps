import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../interfaces/user';
import { switchMap } from 'rxjs/operators';
import { CodegenComponentFactoryResolver } from '../../../node_modules/@angular/core/src/linker/component_factory_resolver';

@Injectable()
export class AuthService {
  user$: Observable<User>;
  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user$ = afAuth.authState.switchMap(user => {
      if(user){
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else{
        return Observable.of(null);
      }
    })
   }

   loginWithGoogle(){
     const provider = new firebase.auth.GoogleAuthProvider();
     this.afAuth.auth.signInWithPopup(provider).then((credential) => {
       this.updateUser(credential.user);
     })
   }

   updateUser(user){
     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
     const data: User = { uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, roles: { subscriber: true, admin: false } }

     if(data.email == "pedrosranchezchacon@gmail.com") {
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: {
          subscriber: true,
          admin: true
        }
      }
      return userRef.set(data, {merge: true});
    }
    else{
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        roles: {
          subscriber: true,
          admin: false
        }
      }
      return userRef.set(data, {merge: true});
    }

   }

   logout(){
     this.afAuth.auth.signOut();
   }

}

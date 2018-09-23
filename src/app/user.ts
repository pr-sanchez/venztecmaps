export interface Roles {
  subscriber?: boolean;
  admin?:  boolean;
  }

export class User {
  uid: string;
  email:    string;
  displayName?: string;
  photoURL?: string;
  roles:    Roles;
  constructor(authData) {
    this.email    = authData.email
    this.photoURL = authData.photoURL
    if (this.email=="pedrosranchezchacon@gmail.com"){
      this.roles    = {
          admin: true
      }
    }
    else{
      this.roles    = { admin: false }
    }
  }
}

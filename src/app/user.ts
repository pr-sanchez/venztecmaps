export interface Roles {
    admin?:  boolean;
    reader: boolean;


  }
  export class User {
    email:    string;
    photoURL: string;
    roles:    Roles;
    constructor(authData) {
      this.email    = authData.email
      this.photoURL = authData.photoURL
      if (this.email=="pedrosranchezchacon@gmail.com"){
        this.roles    = {
            admin: true,
            reader: true
          }
      }
      else{
        this.roles    = { reader: true }
      }
    }
  }


  // export interface Roles {
  //   reader: boolean;
  //   author?: boolean;
  //   admin?:  boolean;
  // }
  // export class User {
  //   email:    string;
  //   photoURL: string;
  //   roles:    Roles;
  //   constructor(authData) {
  //     this.email    = authData.email
  //     this.photoURL = authData.photoURL
  //     if (this.email=="pedrosranchezchacon@gmail.com"){
  //       this.roles    = {
  //           admin : true,
  //           author : true,
  //           reader: true
  //         }
  //     }
  //     else{
  //       this.roles    = { reader: true }
  //     }
  //   }
  // }

export interface Roles {
  subscriber?: boolean;
  admin?:  boolean;
  }

// export class God{
//   email: User["email"];
//   roles: User["roles"];
//   constructor(authData) {
//     this.email    = authData.email;
//     if (this.email=="pedrosranchezchacon@gmail.com"){
//       this.roles    = {
//           admin : true,
//           subscriber : true
//         }
//     }
//     else{
//       this.roles = {
//         admin : false,
//         subscriber : true
//       }
//     }
//   }
// }


export interface User {
  uid: string;
  email:    string;
  displayName: string;
  photoURL: string;
  roles:    Roles;
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

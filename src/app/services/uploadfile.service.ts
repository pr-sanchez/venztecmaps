// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database-deprecated';
// import * as firebase from 'firebase';
// import { Observable } from 'rxjs/Observable';
// import { FileUpload } from '../form-upload/fileupload';

// @Injectable()
// export class UploadFileService {

//   basePath = '/uploads';
//   uploadsRef: Observable<FileUpload>;
//   uploads: Observable<FileUpload[]>;

//   constructor(private db: AngularFireDatabase) {}


//   getUploads() {
//   this.uploads = this.db.list(this.basePath).map((actions) => {
//     return actions.map((a) => {
//       const data = a.payload.val();
//       const $key = a.payload.key;
//       return { $key, ...data };
//     });
//   });
//   return this.uploads;
// }

// deleteUpload(upload: FileUpload) {
//   this.deleteFileData(upload.$key)
//   .then( () => {
//     this.deleteFileStorage(upload.name);
//   })
//   .catch((error) => console.log(error));
// }


//   pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}) {
//     const storageRef = firebase.storage().ref();
//     const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

//     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//       (snapshot) => {
//         // in progress
//         const snap = snapshot as firebase.storage.UploadTaskSnapshot
//         progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
//       },
//       (error) => {
//         // fail
//         console.log(error)
//       },
//       () => {
//         // success
//         fileUpload.url = uploadTask.snapshot.downloadURL
//         fileUpload.name = fileUpload.file.name
//         this.saveFileData(fileUpload)
//       }
//     );
//   }


//   private saveFileData(fileUpload: FileUpload) {
//     this.db.list(`${this.basePath}/`).push(fileUpload);
//   }
//   //
//   // getFileUploads(query = {}) {
//   //   this.fileUploads = this.db.list(this.basePath, {
//   //     query: query
//   //   });
//   //   return this.fileUploads
//   // }

//   // Writes the file details to the realtime db
//   private deleteFileData(key: string) {
//     return this.db.list(`${this.basePath}/`).remove(key);
//   }

//   // Firebase files must have unique names in their respective storage dir
//   // So the name serves as a unique key
//   private deleteFileStorage(name: string) {
//     const storageRef = firebase.storage().ref();
//     storageRef.child(`${this.basePath}/${name}`).delete()
//   }
// }

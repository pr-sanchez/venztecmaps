import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  form: FormGroup;
  isChecked: boolean = false;
  // attended: any = [
  //   'yes',
  //   'no'
  // ];

  constructor(private fb: FormBuilder, private af: AngularFireDatabase) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      people: ['', Validators.required],
      country: ['', Validators.required],
      date1: ['', Validators.required],
      date2: ['', Validators.required],
      isChecked: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  onSubmit() {
    const {name, email, phone, people, country, date1, date2, isChecked, message} = this.form.value;
    const date = Date();
    const html = `
      <div>From: ${name}</div>
      <div>Email: <a href="mailto:${email}">${email}</a></div>
      <div>Date: ${date}</div>
      <div>Phone: ${phone}</div>
      <div>People: ${people}</div>
      <div>Country: ${country}</div>
      <div>Travel Date: ${date1}</div>
      <div>Travel end date: ${date2}</div>
      <div>Checked: ${isChecked}</div>
      <div>Message: ${message}</div>
    `;
    let formRequest = { name, email, phone, people, country, date1, date2, isChecked, message, date, html };
    this.af.list('/messages').push(formRequest);
    this.form.reset();
  }

}



// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


exports.sendContactMessage = functions.database.ref('/messages/{pushKey}').onWrite(event => {
  const snapshot = event.data;
// Only send email for new messages.
  if (snapshot.previous.val() || !snapshot.val().name) {
    return;
  }

  const val = snapshot.val();

  var destino = 'pedrosranchezchacon@gmail.com';
  var asunto = `Informacion requerida por ${val.name}`

  const mailOptions = {
    to: destino,
    subject: asunto,
    html: val.html
  };

  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log("Email enviado");});
});


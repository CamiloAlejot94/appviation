import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

declare var firebase

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})

export class SignUpPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello SignUpPage Page');
  }

  continue(){
  }

  goToBack(){
    this.navCtrl.pop()
  }

  showRadio(name, email, user, pass) {
    let alert = this.alertCtrl.create();
    alert.setTitle('What´s your job?');

    alert.addInput({
      type: 'radio',
      label: "I'm a pilot",
      value: 'Pilot',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: "I'm an ATC",
      value: 'ATC',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: job => {
        this.signUp(name, email, user, pass, job)
      }
    });
    alert.present();
  }

  signUp (name, email, user, pass, job){
    firebase.auth().createUserWithEmailAndPassword(email, pass).then( val => {

       firebase.database().ref('users/' + val.uid).set({
         name : name,
         email : email,
         user : user,
         pass : pass,
         job : job
       });
      console.log("Se logueo y se guardaron los datos")
    }).catch( error => {
      // Handle Errors here.
      let errorMessage = error.message;
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: errorMessage,
        buttons: ['OK']
      });
      alert.present();
    });
  }

}

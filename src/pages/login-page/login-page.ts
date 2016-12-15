import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { SignUpPage } from '../sign-up/sign-up';

declare var firebase

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})

export class LoginPage{

  constructor(public navCtrl: NavController, public loadingCtrl : LoadingController, public alertCtrl : AlertController) {}

  login(user, pass){
    let loader = this.loadingCtrl.create({
      content : 'Loading...',
      duration : 7000,
      dismissOnPageChange : true
    })
    loader.present()
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode + ' ' + errorMessage)
      let alert = this.alertCtrl.create({
        title : 'Error',
        subTitle : errorMessage,
        buttons : ['OK']
      })
      alert.present()
      loader.dismiss()
    });
  }

  goToSignUp(){
    this.navCtrl.push(SignUpPage)
  }

}

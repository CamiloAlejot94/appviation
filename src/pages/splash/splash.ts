import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Facebook } from 'ionic-native';

import { LoginPage } from '../login-page/login-page';
import { InitialTest } from '../initial-test/initial-test';

declare var firebase : any

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public loadingCtrl : LoadingController) {}

  ionViewDidLoad() {
    console.log('Hello SplashPage Page');
  }

  ngOnInit(){
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        let loader = this.loadingCtrl.create({
          content : 'Loading...',
          dismissOnPageChange : true
        })
        loader.present()
        this.navCtrl.setRoot(InitialTest)
      } else {
        console.log("El usuario no está logueado")
      }
    })
  }

  goToLogin(){
    this.navCtrl.push(LoginPage)
  }

  facebookLogin(){
    // console.log(Facebook)
    Facebook.login(['email']).then((_response) => {
      var creds = firebase.auth.FacebookAuthProvider.credential(_response.authResponse.accessToken)
      firebase.auth().signInWithCredential(creds)
    }).then((authData) => {
       let loader = this.loadingCtrl.create({
        content: 'Loading...',
        dismissOnPageChange : true
      });
      loader.present()
    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present()
    });
  }

  disabled(){
    let alert = this.alertCtrl.create({
      title : 'Sorry!',
      subTitle : 'This function is disabled',
      buttons : ['OK']
    })

    alert.present()
  }

}

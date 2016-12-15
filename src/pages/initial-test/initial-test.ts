import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController } from 'ionic-angular';

import { AboutInitialTest } from '../initial-test/about-initial-test/about-initial-test';

declare var firebase : any

@Component({
  selector: 'page-initial-test',
  templateUrl: 'initial-test.html'
})

export class InitialTest implements OnInit {

  name : string

  constructor(public navCtrl: NavController, public menuCtrl : MenuController, public alertCtrl : AlertController) {
    this.menuCtrl.enable(false)
  }

  goToEalts(){
    this.navCtrl.push(AboutInitialTest)
  }

  ngOnInit(){
    let myUser
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).once('value', data =>{
          myUser = data.val().name
          this.name = myUser   
        })
      } else {     
        console.log('No hay un usuario logueado')
      }
    });
  }

  disable(){
    let alert = this.alertCtrl.create({
      title : 'Sorry!',
      subTitle : 'This function is disabled',
      buttons : ['OK']
    })
    alert.present()
  }

  signOut(){
    let nav = this.navCtrl
    firebase.auth().signOut().then(function() {
      nav.pop()
    },error => {
      // An error happened.
    });
  }


}

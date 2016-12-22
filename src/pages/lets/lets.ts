import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IcaoStandars } from '../icao-standars/icao-standars';
import { QuickTestPage } from '../quick-test/quick-test';
import { FinalTestPage } from '../final-test/final-test';
import { UserProfilePage } from '../user-profile/user-profile';


declare var firebase : any;

@Component({
  selector: 'page-lets',
  templateUrl: 'lets.html'
})

export class Lets implements OnInit {

  // PANTALLAS PARA NAV PUSH
  quickTest = QuickTestPage
  finalTest = FinalTestPage
  userProfile = UserProfilePage

  constructor(public navCtrl: NavController) {
  }

  goToICAO(page){
    this.navCtrl.push(IcaoStandars, {
      page : page
    })
  }
  //Se precargan los datos de firebase para que se demore menos mostrando los datos en la siguiente pantalla
  ngOnInit(){
    firebase.database().ref('/').once('value', snap => {
    })
  }

}
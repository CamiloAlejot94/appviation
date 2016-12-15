import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { InitialListening } from '../../initial-test/initial-listening/initial-listening';


@Component({
  selector: 'page-initial-test-content',
  templateUrl: 'initial-test-content.html'
})
export class InitialTestContent {


  constructor(public navCtrl: NavController) {}

  goToListening(page){
    this.navCtrl.push(InitialListening, {
      page : page
    })
  }

}

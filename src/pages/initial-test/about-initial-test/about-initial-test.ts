import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import { InitialTestContent } from '../../initial-test/initial-test-content/initial-test-content';

declare var firebase : any

@Component({
  selector: 'page-about-initial-test',
  templateUrl: 'about-initial-test.html'
})
export class AboutInitialTest {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('Hello AboutInicialTestPage Page');
  }

  goToTips(){
    // this.navCtrl.push(TipsTest)
  }

  openTips() {

    let modal = this.modalCtrl.create(TipTest);
    modal.present();
  }

}

// ========================================================================================================================
// ===================================================== VENTANA MODAL =====================================================
// ========================================================================================================================

@Component({
  selector: 'page-tips-test',
  templateUrl: 'tips-test.html'
})
export class TipTest {

  tip : string

  constructor(public viewCtrl: ViewController, public navCtrl: NavController,) {
    firebase.database().ref('tips').once('value' , data => {
      let dataBase = data.val()
      let randomNum = Math.floor((Math.random() * (dataBase.length - 1)) + 0)
      this.tip = dataBase[randomNum]
    })
  }

  goIt(){
    this.navCtrl.push(InitialTestContent)
  }

  closeModal(){
    this.viewCtrl.dismiss()
  }

}
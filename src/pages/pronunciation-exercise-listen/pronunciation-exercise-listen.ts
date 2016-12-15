import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, ViewController } from 'ionic-angular';

import { PronunciationExercise } from '../pronunciation-exercise/pronunciation-exercise'

declare var firebase : any
declare var jQuery
declare var responsiveVoice

@Component({
  selector: 'page-pronunciation-exercise-listen',
  templateUrl: 'pronunciation-exercise-listen.html'
})
export class PronunciationExerciseListen implements OnInit{

  numExercise : number;
  title : string;
  firebaseDescription : any;
  description : string;
  icaoComponents = false;
  //Clases para los botones de del primer ejercicio
  btnAlpClass = "icaoButton"
  btnNumClass = "icaoButton-off button-outline"
  optionICAO = 1;
  number = 0;

  contentLoad : any

  constructor(public navCtrl: NavController, navParams : NavParams, public modalCtrl: ModalController) {
    this.numExercise = navParams.get('numExercise');
  }

  ngOnInit(){
    firebase.database().ref('/pronunciationExerciseListen').once('value', snap => {
      let firebaseData = snap.val()
      this.firebaseDescription = firebaseData.descriptionExercises
      this.pushDescription()
    }).then(()=> this.contentLoad = true)
  }

  pushDescription () {

    if(this.numExercise){
      this.title = this.firebaseDescription[0].title
      this.description = this.firebaseDescription[0].description
      this.icaoComponents = true
    }
  }

  //Opciones solo para el primer ejercicio
  icaoOptions(val){
    if (val == 'num'){
      this.description = this.firebaseDescription[1].description
      this.btnNumClass = "icaoButton"
      this.btnAlpClass = "icaoButton-off"
      this.optionICAO = 0
    } else{
      this.description = this.firebaseDescription[0].description
      this.btnNumClass = "icaoButton-off"
      this.btnAlpClass = "icaoButton"
      this.optionICAO = 1
    }
  }

  goToSkip (val){
    this.navCtrl.push(PronunciationExercise, {
      exercise : val
    })
  }

  //Abre la ventana modal que está debajo
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalExerciseListen, characterNum);
    modal.present();
  }

}


/*=================================================================================================================================================================
=======================================VENTANA MODAL===============================================================================================================
=================================================================================================================================================================*/

@Component({
  selector: 'page-modal-exercise-listen',  
  templateUrl: 'modalExerciseListen.html'
  
})

export class ModalExerciseListen implements OnInit{
  character;

  words : any
  sound = false
  title : string
  file;
  numbers = false;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    //this.pushIcao(this.params.get('charNum'))

  }

  ngOnInit(){
    if(this.params.get('charNum') == 1){
      firebase.database().ref('/pronunciationExerciseListen').once('value', snap => {
        let firebaseData = snap.val().icaoAlphabet1
        this.words = firebaseData
      })
      .then(() => this.pushIcao())
      this.title = "Alphabet"
    }else{
      firebase.database().ref('/pronunciationExerciseListen').once('value', snap => {
        let firebaseData = snap.val().icaoNumbers1
        this.words = firebaseData
      })
      .then(() => this.pushIcao())
      this.title = "Numbers"
      this.numbers = true;
    }
  }

  pushIcao(){
    firebase.database().ref('/pronunciationExerciseListen').once('value', snap => {

      jQuery("#listWords").drum({ panelCount: 24,
        onChange : function (selected) {
          responsiveVoice.speak(selected.value, "US English Male");
        }
      });
      this.sound = true
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
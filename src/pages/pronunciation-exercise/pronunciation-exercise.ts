import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { PronunciationPractice } from '../pronunciation-practice/pronunciation-practice'

declare var firebase

@Component({
  selector: 'page-pronunciation-exercise',
  templateUrl: 'pronunciation-exercise.html'
})
export class PronunciationExercise implements OnInit {

  //Contenido para cargar
  contentLoad = false

  @ViewChild('pronunciationPracticeSlide') slider: Slides;

  pronunciationSlideOptions = {
    //pager : true,
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 170
  };

  practices : any
  exercise : number
  numExercise : any

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.numExercise = navParams.get('exercise')    
    this.exercise = navParams.get('exercise') - 1
  }

  ngOnInit(){
    //Entra a la base de datos y mira cuantas prácticas tiene el ejercicio que se ha enviado de la pantalla anteior
    firebase.database().ref('pronunciationPractice/' + this.exercise).once('value', snap => {
      let firebaseData = snap.val()
      this.practices = firebaseData
    }).then(() => this.contentLoad = true)
  }

  //Método para volver a escuchar los ICAO alphabet and Numbers
  backToPronunciationListen (){
    this.navCtrl.pop()
  }

  goToPractice(ex, prac){
    this.navCtrl.push(PronunciationPractice, {
      exercise : ex,
      practice : prac
    })
  }
  

}
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PronunciationExerciseListen } from '../pronunciation-exercise-listen/pronunciation-exercise-listen'
import { ComprehensionExercise } from '../comprehension-exercise/comprehension-exercise'
import { FluencyExercise } from '../fluency-exercise/fluency-exercise'
import { InteractionExercise } from '../interaction-exercise/interaction-exercise'

declare var firebase : any

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})

export class Exercises implements OnInit {


  page : any
  title : any
  exercises : any
  exerciseNum = []

  constructor(public navCtrl: NavController, navParams: NavParams) {

    //Recibe las variables que se envian de ICAO
    this.page = navParams.get('page');
    this.title = this.page


  }

  //Este metodo envia al usuario a la pagina de practicas de la opcion que haya seleccionado en ICAO
  goToExercise (page, ex){
    if(page == 'pronunciation'){
      this.goToPronunciation(ex);
    } else if (page == 'comprehension'){
      this.goToComprehension(ex);
    } else if (page == 'fluency'){
        this.goToFluency(ex)
      } else if (page == 'interaction'){
        this.goToInteraction(ex)
      }
  }

  //Abre la página que contiene los ejercicios de PronunciationExerciseListen
  goToPronunciation(ex){
    this.navCtrl.push(PronunciationExerciseListen, {
      numExercise : ex
    });
  }

  //Abre la página que contiene los ejercicios de ComprehensionExercise
  goToComprehension(ex){
    this.navCtrl.push(ComprehensionExercise,{
      exercise : ex
    });
  }

  //Abre la página que contiene los ejercicios de FluencyExercise
  goToFluency(ex){
    this.navCtrl.push(FluencyExercise,{
      exercise : ex
    });
  }

  //Abre la página que contiene los ejercicios de InteractionExercise
  goToInteraction(ex){
    this.navCtrl.push(InteractionExercise,{
      exercise : ex
    });
  }

  ngOnInit(){
    firebase.database().ref(this.page+"Exercise").once("value", data => {
      this.exercises = data.val()
      for (let i = 0; i< this.exercises.length; i++){
        this.exerciseNum.push(i)
      }
    })
  }

}
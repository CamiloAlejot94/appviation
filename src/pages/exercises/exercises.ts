import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PronunciationExerciseListen } from '../pronunciation-exercise-listen/pronunciation-exercise-listen'
import { ComprehensionExercise } from '../comprehension-exercise/comprehension-exercise'
import { FluencyExercise } from '../fluency-exercise/fluency-exercise'
import { InteractionExercise } from '../interaction-exercise/interaction-exercise'
import { StructureExercise } from '../structure-exercise/structure-exercise'
import { VocabularyExercise } from '../vocabulary-exercise/vocabulary-exercise'
import { QuickTestPage } from '../quick-test/quick-test';
import { FinalTestPage } from '../final-test/final-test';
import { UserProfilePage } from '../user-profile/user-profile';

declare var firebase : any

@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})

export class Exercises implements OnInit {

  // PANTALLAS PARA NAV PUSH
  quickTest = QuickTestPage
  finalTest = FinalTestPage
  userProfile = UserProfilePage

  pageName : any
  exercises : any
  exerciseNum = []

  constructor(public navCtrl: NavController, navParams: NavParams) {
    //Recibe las variables que se envian de ICAO
    this.pageName = navParams.get('page');
  }

  goToExercises(pageName, ex){
    // Evalúa el nombre de la pantalla para asignarle el link a la variable linkExercise
    if (pageName == 'pronunciation'){
    } else if (pageName == 'comprehension'){    
    } else if (pageName == 'fluency'){
      this.navCtrl.push(FluencyExercise, {
        pageName : pageName,
        exerciseNumber : ex
      })
    } else if (pageName == 'interaction'){
      this.navCtrl.push(InteractionExercise, {
        pageName : pageName,
        exerciseNumber : ex
      })
    } else if (pageName == 'vocabulary'){
      this.navCtrl.push(VocabularyExercise, {
        pageName : pageName,
        exerciseNumber : ex
      })    
    } else if (pageName == 'structure'){  
      this.navCtrl.push(StructureExercise, {
        pageName : pageName,
        exerciseNumber : ex
      })  
    }
  }

  ngOnInit(){
    firebase.database().ref(this.pageName+"Exercise").once("value", data => {
      this.exercises = data.val()
      for (let i = 0; i< this.exercises.length; i++){
        this.exerciseNum.push(i)
      }
    })
  }

}
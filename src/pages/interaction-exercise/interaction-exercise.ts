import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var firebase : any

@Component({
  selector: 'page-interaction-exercise',
  templateUrl: 'interaction-exercise.html'
})

export class InteractionExercise implements OnInit {

  title : any // Titulo del header
  exerciseNum : any
  pageTitle : any // Titulo del ejercicio
  description : any // Descripción del ejercicio

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.exerciseNum = this.navParams.get('exercise')
    this.title = "Exercise " + this.exerciseNum
  }

  ngOnInit(){
    firebase.database().ref('interactionExercise').once('value', data => {
      let firebaseData = data.val()
      this.pageTitle = firebaseData[this.exerciseNum-1]['title']
      this.description = firebaseData[this.exerciseNum-1]['description']
    })
  }

}

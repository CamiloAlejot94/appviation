import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

declare var firebase : any

@Component({
  selector: 'page-interaction-exercise',
  templateUrl: 'interaction-exercise.html'
})

export class InteractionExercise implements OnInit {


  @ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 200
  };

  contentLoad = false

  title : any // Titulo del header
  exerciseNum : any
  pageTitle : any // Titulo del ejercicio
  description : any // Descripción del ejercicio

  // CONTENIDOS POR PANTALLAS
  ex1 = false
  ex2 = false
  ex3 = false
  ex4 = false
  ex5 = false

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.exerciseNum = this.navParams.get('exercise')
    this.title = "Exercise " + this.exerciseNum
    this.viewContent()
  }

  viewContent(){
    switch(this.exerciseNum){
      case '1' :
      this.ex1 = true
      break;
      case '2' :
      this.ex2 = true
      break;
      case '3' :
      this.ex3 = true
      break;
      case '4' :
      this.ex4 = true
      break;
      case '5' :
      this.ex5 = true
      break;
      default :
      console.log('Default')      
      break;
    }
  }

  ngOnInit(){
    firebase.database().ref('interactionExercise').once('value', data => {
      let firebaseData = data.val()
      this.pageTitle = firebaseData[this.exerciseNum-1]['title']
      this.description = firebaseData[this.exerciseNum-1]['description']
    }).then(() => this.contentLoad=true)
  }

}

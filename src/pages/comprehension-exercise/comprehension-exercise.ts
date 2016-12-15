import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides  } from 'ionic-angular';

import { ComprehensionPractice } from '../comprehension-practice/comprehension-practice'

declare var firebase : any
declare var Swiper : any

@Component({
  selector: 'page-comprehension-exercise',
  templateUrl: 'comprehension-exercise.html'
})

export class ComprehensionExercise implements OnInit {

  @ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 90
  };

  item = 0
  title : string;
  subtitle : string;
  description : string;
  firebaseDescription : string;
  firebasePractice : any;
  practices : any;
  link : any;

  contentLoad : any

  //Titulos para los ejercicios
  titles = ["Explain - Ask a question - Give advice", "Back to Back", "Listening"];

  pedl = false; //Parrafo adicional (Affirm, Negative, Not stated)

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.item = navParams.get('exercise');
    this.title = "Exercise " + this.item;
    
  }

  ionViewDidLoad() {
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  ngOnInit(){
    firebase.database().ref('/comprehensionExercise').once('value', snap => {
      let firebaseData = snap.val()
      //Lee las descripciones de firebase y las inyecta
      this.firebaseDescription = firebaseData.description
      this.pushDescription()
      //Lee las prácticas de firebase y las inyecta
      this.firebasePractice = firebaseData
      this.pushPractice()
    }).then(() => this.contentLoad=true)
    //Inicializa los slides
    /*Swiper('.swiper-container', {
        slidesPerView: 2,
        width: 300,
        spaceBetween: 30,
        centeredSlides: true
    })*/
  }

  //Pone la descripción del ejercicio y el titulo
  pushDescription(){
    if (this.item == 1 || this.item == 4 || this.item == 7){
      this.subtitle = this.titles[0]
      this.description = this.firebaseDescription[0]
    } else if (this.item == 2 || this.item == 5 || this.item == 8){
      this.subtitle = this.titles[1]
      this.description = this.firebaseDescription[1]
    } else {
      this.subtitle = this.titles[2]      
      this.pedl = true;
      this.description = this.firebaseDescription[2]
    }
  }

  pushPractice (){

    //Tocó poner ese chorrero de if porque el switch no se le da la gana de funcionar
    if(this.item == 1){this.practices = this.firebasePractice.practice1}
    else if(this.item == 2){this.practices = this.firebasePractice.practice2}
    else if(this.item == 3){this.practices = this.firebasePractice.practice3}
    else if(this.item == 4){this.practices = this.firebasePractice.practice4}
    else if(this.item == 5){this.practices = this.firebasePractice.practice5}
    else if(this.item == 6){this.practices = this.firebasePractice.practice6}
    else if(this.item == 7){this.practices = this.firebasePractice.practice7}
    else if(this.item == 8){this.practices = this.firebasePractice.practice8}
    else if(this.item == 9){this.practices = this.firebasePractice.practice9}
    else if(this.item == 10){this.practices = this.firebasePractice.practice10}
  
  }

  goToPractice (val){
    this.navCtrl.push(ComprehensionPractice, {
      practice : val
    })
  }

}

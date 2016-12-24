import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

declare var firebase

@Component({
  selector: 'page-vocabulary-practice',
  templateUrl: 'vocabulary-practice.html'
})

export class VocabularyPractice implements OnInit{

  @ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 270
  };

  firebaseDatabase = firebase.database()
  exerciseNum : any
  practiceNum : any
  item : any
  description : any

  btnMic = false
  btnPlay= false
  btnStop=false
  btnPause=false
  btnDone=false
  minSec=false

  ex1 = false
  partsPlane = ["______", "______","______","______","______","______","______","______","______","______","______","______","______","______","______","______","______","______"]
  ex2 = false
  ex4 = false

  words = [[], []]
  answers = [["lack","of","readback"], ["overlooked","relevant","information", "of", "the", "ATIS"]]
  myWords : any
  myAnswer : any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.practiceNum = this.navParams.get('numEx')
    this.exerciseNum = this.navParams.get('item')
    console.log(this.practiceNum);
    console.log(this.exerciseNum);
    if (this.exerciseNum==3 && this.practiceNum==1){
      this.btnMic=true
      this.minSec=true
    } else if(this.exerciseNum==1 && this.practiceNum==1){
      this.ex1 = true    
    } else if(this.exerciseNum==2 && this.practiceNum==1){
      this.ex2 = true    
    }
    else if(this.exerciseNum==4 && this.practiceNum==1){
      this.ex4 = true
      this.btnDone=true      
    }
    else {
      this.btnDone=true   
    }
    this.myWords = this.answers[1];
    this.myAnswer = this.words[1]
  }

  shwPause(){  
    this.btnPause=true
    this.btnPlay=false
  }

  shwPlay(){  
    this.btnPlay=true
    this.btnPause=false
  }

  shwMic(){
    this.btnMic=true
    this.btnStop=false
    this.btnPlay=true
  }

  shwStop(){
    this.btnMic=false
    this.btnStop=true
    this.btnPause=false
    this.btnPlay=false

  }


  // =======================================================================================================================================================
  // =====================================================  MÉTODOS PARA EJERCICIO 2 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================
  
  selectAnswer(index, word){
    document.getElementById(index+"-answer").classList.toggle('selectWord')
    this.words[1].push({"index" : index, "word" : word})
  }

  // =======================================================================================================================================================
  // =================================================  TERMINA MÉTODOS PARA EJERCICIO 2 PRÁCTICA 1  ======================================================  
  // =======================================================================================================================================================


  
  // =======================================================================================================================================================
  // =====================================================  MÉTODOS PARA EJERCICIO 4 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================
  
  pushAnswer(index, word){
    document.getElementById(index+"-question").classList.toggle('opacityWords')
    this.words[1].push({"index" : index, "word" : word})
  }

  popAnswer(word, index, i){
    // document.getElementById(this.index+"-as").classList.toggle('opacityWords')
    document.getElementById(i+"-answer").classList.toggle('displayWords')
    document.getElementById(index+"-question").classList.toggle('opacityWords')
    this.answers[1][index] = word
  }

  // =======================================================================================================================================================
  // =================================================  TERMINA MÉTODOS PARA EJERCICIO 4 PRÁCTICA 1  ======================================================  
  // =======================================================================================================================================================


  ngOnInit(){
    this.firebaseDatabase.ref('/vocabularyPractice').once('value', data => {
      // this.description = data.val()[this.exerciseNum-1][this.practiceNum-1].description
    })
  }

}

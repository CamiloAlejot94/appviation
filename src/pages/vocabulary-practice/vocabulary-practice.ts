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

  words = [[], []]
  answers = [["lack","of","readback"], ["Overlooked","relevant","information", "of", "the", "ATIS"]]
  myWords : any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.practiceNum = this.navParams.get('numEx')
    this.exerciseNum = this.navParams.get('item')
    console.log(this.practiceNum);
    console.log(this.exerciseNum);
    if (this.exerciseNum==3 && this.practiceNum==1){
      this.btnMic=true
      this.minSec=true
    }
    else {
      this.btnDone=true      
    }
    this.myWords = this.answers[1];
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

  ngOnInit(){
    this.firebaseDatabase.ref('/vocabularyPractice').once('value', data => {
      // this.description = data.val()[this.exerciseNum-1][this.practiceNum-1].description
    })
  }

}

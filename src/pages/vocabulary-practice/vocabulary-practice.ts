import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, AlertController } from 'ionic-angular';

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
  partsPlane = ["_________", "_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________","_________"]
  partsPlaneAns = ["Light", "Windscreen","Tail fin","Outboard slats","Tyre","Flap","Rudder","Aerial","Engine","Nose","Spoiler","Radome","Winglet","Emergency exit","Aileron","Slat","Elevator","Fuselaje"]
  // Componentes del ejercicio 2
  ex2 = false
  selectedWordEx2
  ex4 = false

  words = [[], []]
  answersEx2 = [["Pier","Blast fence","Stopway","Runway centerline lightning","Engine Run-up area"], []]
  answers = [["lack","of","readback"], ["overlooked","relevant","information", "of", "the", "ATIS"]]
  myWords : any
  myAnswer : any

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
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
      this.myWords = this.answersEx2[0]
    }
    else if(this.exerciseNum==4 && this.practiceNum==1){
      this.ex4 = true
      this.btnDone=true
      this.myWords = this.answers[1];
      this.myAnswer = this.words[1]  
    }
    else {
      this.btnDone=true   
    }
    
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
  // =====================================================  MÉTODOS PARA EJERCICIO 1 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================

  wordListEx1(val){
    let alert = this.alertCtrl.create()
    alert.setTitle("Select the correct word")
    for(let i=0; i<this.partsPlaneAns.length;i++ ){
      if(i==0){
        alert.addInput({
        type: 'radio',
        label: this.partsPlaneAns[i],
        value: this.partsPlaneAns[i],
        checked: true})
      }
      else {
      alert.addInput({
        type: 'radio',
        label: this.partsPlaneAns[i],
        value: this.partsPlaneAns[i],
      checked: false})}
    }
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.partsPlane[val]=data
      }
    });
    alert.present();
  }

  // =======================================================================================================================================================
  // =====================================================  TERMINA MÉTODOS PARA EJERCICIO 1 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================



  // =======================================================================================================================================================
  // =====================================================  MÉTODOS PARA EJERCICIO 2 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================
  
  selectAnswer(index, word){
    for(let i = 0; this.answersEx2[1].length ; i++){
      console.log(i)
      document.getElementById(i+"-answer").classList.toggle('selectWord')
    }
    document.getElementById(index+"-answer").classList.toggle('selectWord')
    
    // this.words[1].push({"index" : index, "word" : word})
    // this.selectedWordEx2 = word;
    // if(this.selectedWordEx2 == 'Stopway'){
    //   console.log('Respuesta correcta')
    // } else {
    //   console.log('Respuesta Incorrecta')      
    // }
  }

  // =======================================================================================================================================================
  // =================================================  TERMINA MÉTODOS PARA EJERCICIO 2 PRÁCTICA 1  ======================================================  
  // =======================================================================================================================================================


  
  // =======================================================================================================================================================
  // =====================================================  MÉTODOS PARA EJERCICIO 4 PRÁCTICA 1  ==========================================================  
  // =======================================================================================================================================================
  
  pushAnswer(index, word){
    if(document.getElementById(index+"-question").classList.toggle('opacityWords')){
      // Envía la respuesta al vector de respuestas
      this.words[1].push({"index" : index, "word" : word})
    } else {
      // Lo mantiene desactivado en caso de que el usuario ya lo haya enviado como respuesta
      document.getElementById(index+"-question").classList.toggle('opacityWords')
    }
  }

  popAnswer(word, index, i){
    this.words[1].splice(i,1)
    this.words[1]
    document.getElementById(index+"-question").classList.toggle('opacityWords')
    this.answers[1][index] = word
  }

  verifyExercise(){
    console.log(this.words[1])
  }

  // =======================================================================================================================================================
  // =================================================  TERMINA MÉTODOS PARA EJERCICIO 4 PRÁCTICA 1  ======================================================  
  // =======================================================================================================================================================


  ngOnInit(){
    this.firebaseDatabase.ref('/vocabularyPractice').once('value', data => {
      this.description = data.val()[this.exerciseNum-1][this.practiceNum-1].description
    })
  }

}

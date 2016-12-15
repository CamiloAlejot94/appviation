import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var firebase

@Component({
  selector: 'page-pronunciation-practice',
  templateUrl: 'pronunciation-practice.html'
})

export class PronunciationPractice {

  pronunciationPracticeSlideOptions = {
    //pager : true,
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 240
  };

  //Valores que recibe de pronunciation exercise (ex, prac)
  exercise : any
  practice : any

  //Contenido para cargar
  contentLoad = false

  //Contenido que lee de firebase
  description : any

  //Estilos de las prácticas
  prac1 = false
  prac2 = false
  prac3 = false
  prac4 = false  

  //Contenido para estilo 1 de practica
  prac1Audios : any

  //Respuesta que se escribe en la practica 2
  prac2Audios : any
  prac2Response : string
  
  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.exercise = this.navParams.get('exercise')
    this.practice = this.navParams.get('practice')

    //Llama el método para cargar el contenido de acuerdo a ejercicio y la practica
    this.selectExercise(this.exercise, this.practice)
  }

  ionViewDidLoad() {
    firebase.database().ref('/pronunciationPractice').once('value', snap => {
      //Entra al link ubicando el ejercicio y la práctica
      this.description = snap.val()[this.exercise - 1][this.practice - 1].description
      //capturo los audios de practica 1
      this.prac1Audios = snap.val()[this.exercise - 1][this.practice - 1].audios
      this.prac2Audios = snap.val()[this.exercise - 1][this.practice - 1].audios
    }).then(() => this.contentLoad = true)
  }

  selectExercise(ex, prac){
    //Los números llegan como string
    switch (ex){
      case '1' :
        this.stylePractice(prac)
      break;
    }
  }

  stylePractice(practice){

    switch(practice){
      case 1 : 
        this.prac1 = true
      break;
      case 2 : 
        this.prac2 = true
      break;
    }
  }

  //poner numero que selecciona el usuario en el estilo de práctica 2 
  putNumber(val){
    this.prac2Response = val
  }

}
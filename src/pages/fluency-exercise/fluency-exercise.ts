import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ShowPracticesPage } from '../show-practices/show-practices';
import { UserProfilePage } from '../user-profile/user-profile';

declare var firebase 

@Component({
  selector: 'page-fluency-exercise',
  templateUrl: 'fluency-exercise.html'
})
export class FluencyExercise implements OnInit{

@ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 90
  };
  
  // PANTALLAS PARA NAV PUSH
  userProfile = UserProfilePage

  title:any
  item:number
  ex1=false
  PageTitle: any
  description: any
  itemlist= ["Use every opportunity you have to speak in English. The more English you speak the more fluent and natural you will sound over time. ",
  "Believe in the English you know, be confident about speaking in English, and feel comfortable when doing so.",
  "Do your best to communicate a clear message.",
  "The most important thing is to communicate what you want or need to say.",
  "Do your best to sound as natural as possible. "]
  practices: any
  shdwTxt= false
  playBtn= true
  pauseBtn= false
  btnTxt= "Listen"
  audListening=false
  practicesNumber : any // Captura de firebase la cantidad de practicas que tiene un ejercicio
  
  constructor(public navCtrl: NavController, navParams: NavParams) 
  {
      this.item = navParams.get('exerciseNumber');
      this.title =  this.item;
      if(this.item==1){
        this.ex1=true
      }
      if(this.item== 3 ||this.item== 5 ||this.item== 7 ||this.item== 8||this.item== 9)
      {
        this.shdwTxt=true
      }
      if(this.item==3 || this.item==5){
        this.audListening=true
      }

  }

ngOnInit(){
    firebase.database().ref("fluencyExercise").once("value", data=>{
    let firebaseData = data.val()
    console.log(firebaseData)
    this.PageTitle = firebaseData[this.item-1]['title']
    this.description = firebaseData [this.item -1]['description']
    this.practicesNumber = firebaseData [this.item -1]['practicesNumber']
  })
}

goToPactices(ex, btn, prac){
  this.navCtrl.push(ShowPracticesPage, {
    numEx : ex,
    buttonTxt : btn,
    practices : prac}
    
  
  )
}
 playAudio(){
  if (this.playBtn==true){
    this.playBtn=false
    this.pauseBtn=true
    this.btnTxt="Pause"
  }
  else{
    this.playBtn=true
    this.pauseBtn=false
    this.btnTxt="Listen"
  }
  }
PauseAudio(){}
}
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ShowPracticesPage } from '../show-practices/show-practices';
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
  
  constructor(public navCtrl: NavController, navParams: NavParams) 
  {
      this.item = navParams.get('exercise');
      this.title =  this.item;
      if(this.item==1){
        this.ex1=true
      }
      
  }

ngOnInit(){
    firebase.database().ref("fluencyExercise").once("value", data=>{
    let firebaseData = data.val()
    console.log(firebaseData)
    
    this.PageTitle = firebaseData[this.item-1]['title']
    this.description = firebaseData [this.item -1]['description']
  })
}

goToPactices(ex, btn, prac){
  this.navCtrl.push(ShowPracticesPage, {
    numEx : ex,
    buttonTxt : btn,
    practices : prac}
    
  
  )
}

}


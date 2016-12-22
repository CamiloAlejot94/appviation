import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { FluencyPractice } from '../fluency-practice/fluency-practice'
import { UserProfilePage } from '../user-profile/user-profile';

@Component({
  selector: 'page-show-practices',
  templateUrl: 'show-practices.html'
})
export class ShowPracticesPage {

  @ViewChild('sliderPractices') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 200
  };
  
  // PANTALLAS PARA NAV PUSH
  userProfile = UserProfilePage

  contentLoad = true
  numEx: any
  buttonTxt: any
  prac : any
  item : any
  practices =   []
  array = []
  


  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.numEx=this.navParams.get("numEx")
    this.buttonTxt=this.navParams.get("buttonTxt")
    this.item=this.navParams.get("practices")
    this.prac = this.navParams.get("A.name")
    this.arrayFor()
  
    for(let i = 0 ; i < this.navParams.get("practices"); i++){
      this.practices.push({"name" : "Practice " + i+1, "exercises" : "5"})
    }
  }
  
  backTo(){
    this.navCtrl.pop()
  }
  goToPractice(b,prac,numEx){
    console.log(b + prac + numEx)
    // this.navCtrl.push(FluencyPractice,{item : b, prac : prac, numEx : numEx})
  }
  
  arrayFor(){
  for(let i=0;i<this.item;i++){
    this.array.push({"name" : i+1})}
}
}

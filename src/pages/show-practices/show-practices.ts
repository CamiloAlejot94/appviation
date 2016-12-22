import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import { Providers } from '../../providers/providers'

import { ComprehensionPractice } from '../comprehension-practice/comprehension-practice'
import { FluencyPractice } from '../fluency-practice/fluency-practice'
import { InteractionPractice } from '../interaction-practice/interaction-practice'
import { StructurePractice } from '../structure-practice/structure-practice'
import { VocabularyPractice } from '../vocabulary-practice/vocabulary-practice'

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

  pageTitle : any
  contentLoad = true
  numEx: any
  buttonTxt: any
  prac : any
  item : any
  practices =   []
  array = []
  


  constructor(public navCtrl: NavController, public navParams : NavParams, public providers : Providers) {
    this.numEx=this.navParams.get("numEx")
    this.buttonTxt=this.navParams.get("buttonTxt")
    this.item=this.navParams.get("practices")
    this.pageTitle = this.providers.pageTitle
    this.arrayFor()
  
    for(let i = 0 ; i < this.navParams.get("practices"); i++){
      this.practices.push({"name" : "Practice " + i+1, "exercises" : "5"})
    }
  }
  
  backTo(){
    this.navCtrl.pop()
  }
  goToPractice(b, prac, numEx){
    if(this.pageTitle == 'pronunciation'){

    } else if( this.pageTitle == 'comprehension' ){
      this.navCtrl.push(ComprehensionPractice,{item : b, prac : prac, numEx : numEx})      
    } else if( this.pageTitle == 'fluency' ){
      this.navCtrl.push(FluencyPractice,{item : b, prac : prac, numEx : numEx})      
    } else if (this.pageTitle == 'interaction') {
      this.navCtrl.push(InteractionPractice,{item : b, prac : prac, numEx : numEx})      
    } else if ( this.pageTitle == 'vocabulary' ){
      this.navCtrl.push(VocabularyPractice,{item : b, prac : prac, numEx : numEx})
    } else if ( this.pageTitle == 'structure' ){
      this.navCtrl.push(StructurePractice,{item : b, prac : prac, numEx : numEx})
    }
    // this.navCtrl.push(FluencyPractice,{item : b, prac : prac, numEx : numEx})
  }
  
  arrayFor(){
  for(let i=0;i<this.item;i++){
    this.array.push({"name" : i+1})}
}
}

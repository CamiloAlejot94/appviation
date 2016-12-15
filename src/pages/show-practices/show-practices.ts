import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, NavParams } from 'ionic-angular';


/*
  Generated class for the ShowPractices page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-show-practices',
  templateUrl: 'show-practices.html'
})
export class ShowPracticesPage {

  @ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 90
  };
  
  contentLoad = true
  numEx: any
  buttonTxt: any
  practices = []

  constructor(public navCtrl: NavController, public navParams : NavParams) {
    this.numEx=this.navParams.get("numEx")
    this.buttonTxt=this.navParams.get("buttonTxt")
    console.log (this.navParams.get("buttonTxt"))
    for(let i = 0 ; i < this.navParams.get("practices"); i++){
      let ex = i+1
      this.practices.push({"name" : "Practice " + ex, "exercises" : "5"})
    }
  }

  ionViewDidLoad() {
    console.log('Hello ShowPracticesPage Page');
  }
  backTo(){
    this.navCtrl.pop()
  }

}

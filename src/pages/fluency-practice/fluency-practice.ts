import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ModalController, ViewController } from 'ionic-angular';

/*
  Generated class for the FluencyPractice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fluency-practice',
  templateUrl: 'fluency-practice.html'
})
export class FluencyPractice {
item : any
prac : any
numEx : any
micContent = false
btnDone = false
btnSend = false
sldcards = false
playBtn= true
pauseBtn= false
listAudio=false
audListening=false
numAud= 5
array=[]
showPlay=false
showStop=false
showList=false



@ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween : 200
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.item=this.navParams.get("item")
  this.prac=this.navParams.get("prac")
  this.numEx=this.navParams.get("numEx")
  this.arrayFor()
  console.log ("item : " + this.item)
  console.log ("prac : " + this.prac)
  console.log ("numEx : " + this.numEx)
  


    if(this.item==1&&this.numEx==1||this.item==2&&this.numEx==1||this.item==4&&this.numEx==1||this.item==4&&this.numEx==2){
      this.btnDone=true}
    else if(this.item==5&&this.numEx==1||this.item==7&&this.numEx==1||this.item==8&&this.numEx==1||this.item==9&&this.numEx==1||this.item==9&&this.numEx==2||this.item==10&&this.numEx==2){
      this.btnSend=true}
    else if(this.item==2&&this.numEx==2||this.item==5&&this.numEx==2||this.item==6&&this.numEx==1||this.item==6&&this.numEx==2||this.item==7&&this.numEx==2||this.item==8&&this.numEx==2||this.item==10&&this.numEx==3){
      this.micContent=true}
    else if (this.item==3){
      this.micContent = false
      this.btnDone = false
      this.btnSend = false}
  if (this.item==1&&this.numEx==2 ||this.item==3&&this.numEx==1||this.item==5&&this.numEx==1||this.item==7&&this.numEx==1||this.item==9&&this.numEx==1||this.item==9&&this.numEx==2||this.item==10&&this.numEx==2){  
      this.sldcards=true}
  if (this.item==2&&this.numEx==1 || this.item==1&&this.numEx==1||this.item==4&&this.numEx==1){
      this.listAudio=true}
  if (this.item==6 && this.numEx==1){
      this.audListening=true}
   if (this.item==8 && this.numEx==1){
      this.showList=true}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FluencyPracticePage');
  }

  playAudio(){  
    this.playBtn=false
    this.pauseBtn=true
  }
pauseAudio(){
    this.playBtn=true
    this.pauseBtn=false
  }      
arrayFor(){
  for(let i=0;i<this.numAud;i++){
    this.array.push({"name" : i+1})}
}
shwPlay(){
this.showPlay=true
this.showStop=false
}
shwStop(){
    this.showStop=true
    this.showPlay=false


  }
  // showCueCard(){
  //   let modal = this.modalCtrl.create(CueCard);
  //   modal.present()
  // }
}


// @Component({
//   selector: 'page-cue-card',
//   templateUrl: 'cue-card.html'
// })


// export class ModalWdW {

//   subMenu = false

//   constructor(public viewCtrl: ViewController) {
//   }

//   showSubmenu(){
//     this.subMenu = !this.subMenu
//   }

  
// }


import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Slides } from 'ionic-angular';


@Component({
  selector: 'page-structure-practice',
  templateUrl: 'structure-practice.html'
})
export class StructurePractice {
array= ["","",""]
item : any
prac : any
numEx : any
myWords : any
myAnswer : any
btnMic = false
btnPlay= false
btnStop=false
btnPause=false
btnDone=false
minSec=false
text=false
sld1=false
answers=['___(stand)', '___ (take)',' __ (film)','___(take off)','__ (be)',' ___ (see)','___ (combine)','___ (lift)','___ (be)','__ (pull up)','___ (there be)','___ (expect)',' __ (be)','____ (can)','___ __ (probably know)','__ ____ (be prevent)']
words=['was standing', 'is taking', 'filming', 'taking off', 'is, to see', 'is combined', 'lifted', 'pull up', 'are', 'pull up', 'there is', 'expect', 'were', 'could', 'will', 'know', 'will be preventing']
answers2=[['','',''],['','','']]
words2=[[],[]]
@ViewChild('sliderComprehension') slider: Slides;

  mySlideOptions = {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween : 200
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public ctrl:AlertController ) {
    this.item=this.navParams.get("item")
    this.prac=this.navParams.get("prac")
    this.numEx=this.navParams.get("numEx")
  

     if (this.item==1 && this.numEx==1||this.item==2 && this.numEx==1||this.item==2 && this.numEx==2||this.item==5 && this.numEx==1||this.item==5 && this.numEx==2){
      this.btnDone=true
      }
      else if(this.item==1 && this.numEx==2||this.item==2 && this.numEx==3||this.item==3 && this.numEx==1||this.item==3 && this.numEx==2||this.item==4 && this.numEx==1) {
        this.btnMic=true
        this.minSec=true}
      if (this.item==1 && this.numEx==1){
        this.text=true
      }
      if (this.item==4 && this.numEx==1){
        this.sld1=true
      }
  }
     
  ionViewDidLoad() {
    console.log('ionViewDidLoad StructurePracticePage');
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
  
  showAlert(ans){
 
    let alert= this.ctrl.create ();
    alert.setTitle( "Select the correct word for the question ")
    for(let i=0; i<this.words.length;i++ ){
      if(i==0){
        alert.addInput({
        type: 'radio',
        label: this.words[i],
        value: this.words[i],
        checked: true})
      }
      else {
      alert.addInput({
        type: 'radio',
        label: this.words[i],
        value: this.words[i],
      checked: false})}
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data)
           this.answers[ans]=data        
        
        
      }
    });
    alert.present();
  }

  pushAnswer(index, word){
    if(document.getElementById(index+"-question").classList.toggle('opacityWords')){
      // Envía la respuesta al vector de respuestas
      this.words2[1].push({"index" : index, "word" : word})
    } else {
      // Lo mantiene desactivado en caso de que el usuario ya lo haya enviado como respuesta
      document.getElementById(index+"-question").classList.toggle('opacityWords')
    }
  }

  popAnswer(word, index, i){
    this.words2[1].splice(i,1)
    this.words2[1]
    document.getElementById(index+"-question").classList.toggle('opacityWords')
    this.answers2[1][index] = word
  }
}

import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, Slide } from 'ionic-angular';
declare var firebase

@Component({
  selector: 'page-structure-exercise',
  templateUrl: 'structure-exercise.html'
})
export class StructureExercise {

  title : any
  item:number
  PageTitle: any
  description: any
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.item=navParams.get('exercise');
    this.title=this.item;
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StructureExercisePage');
  }
  ngOnInit(){
    firebase.database().ref("structureExercise").once("value", data=>{
    let firebaseData = data.val()
    console.log(firebaseData)
    
    this.PageTitle = firebaseData[this.item-1]['title']
    this.description = firebaseData [this.item -1]['description']
  })
}
}


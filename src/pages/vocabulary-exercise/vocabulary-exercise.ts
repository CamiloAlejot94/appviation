import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowPracticesPage } from '../show-practices/show-practices';
import { UserProfilePage } from '../user-profile/user-profile';

declare var firebase

@Component({
  selector: 'page-vocabulary-exercise',
  templateUrl: 'vocabulary-exercise.html'
})
export class VocabularyExercise {

  title : any
  item:number
  pageTitle: any
  description: any

  practicesNumber : any // Cantidad de practicas por cada ejercicio

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('exerciseNumber')
    this.title = this.item
  }

  goToPactices(ex, btn, prac){
    this.navCtrl.push(ShowPracticesPage, {
      numEx : ex,
      buttonTxt : btn,
      practices : prac})
  }

  ngOnInit(){
    firebase.database().ref("vocabularyExercise").once("value", data=>{
      let firebaseData = data.val()
      console.log(firebaseData)
      
      this.pageTitle = firebaseData[this.item-1]['title']
      this.description = firebaseData [this.item -1]['description']
      this.practicesNumber = firebaseData [this.item -1]['practicesNumber']
    })
  }

}

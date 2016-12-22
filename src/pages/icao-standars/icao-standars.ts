import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProfilePage } from '../user-profile/user-profile';
import { Exercises } from '../exercises/exercises';

declare var firebase

@Component({
  selector: 'page-icao-standars',
  templateUrl: 'icao-standars.html'
})

export class IcaoStandars {

  title : any;
  description : string;
  levels :any;
  select = 0;
  loader = true; // spinner
  contentLoad = false // contenido para cargar
  dataFirebase : any;

  userProfile = UserProfilePage

  constructor(public navCtrl: NavController, navParams: NavParams) {
    this.title = navParams.get('page')
    this.description = navParams.get('description')
    this.levels = navParams.get('levels')
  }
  
  pushContent(icaoPage){
    this.title  = this.dataFirebase[icaoPage]['title']
    this.description = this.dataFirebase[icaoPage]['description'],
    this.levels = this.dataFirebase[icaoPage]['levels']
    this.contentLoad=true  
  }

  goToExercises(){
    this.navCtrl.push(Exercises, {
      page : this.title
    });
  }

  pushLevel(val){
    this.select = val-1
    //Deja vacía la clase de los niveles
    for(var i=0; i<this.levels.length; i++){
      this.levels[i].cl = ""
    }
    //Ésta clase pone color al item al que se refiere.
    this.levels[val-1].cl = "select-level-ICAO"
  }

  ionViewDidLoad() {
    firebase.database().ref('/icaoStandars').once('value', snap => {
      this.dataFirebase = snap.val();
      this.pushContent(this.title)
    }).then(() => this.contentLoad=true),(error => console.error('Estoy imprimiendo error ' + error));
  }

}
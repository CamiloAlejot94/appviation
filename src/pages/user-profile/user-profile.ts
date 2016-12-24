import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';



@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html'
})
export class UserProfilePage {
profName= 'Adam Sandler'
profMail= 'Adam.Sandler@papcorn.com'
profUser='AdamSandler'
profPass: any
profShield='Actor'
showPass= '*****'
  constructor(public navCtrl: NavController, public navParams: NavParams, public ctrl: AlertController )  {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }


  changeMail() {
    let prompt = this.ctrl.create({
      title: 'Change mail',
      message: "Change your Email address",
      inputs: [
        {  
          name: 'title',
          placeholder: 'title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data)
            this.profMail=data.title;               
          }
        }
      ]
    });
    prompt.present();
   
  }

  changeUser() {
    let prompt = this.ctrl.create({
      title: 'Change User',
      message: "Change your User name",
      inputs: [
        {  
          name: 'title',
          placeholder: 'title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data)
            this.profUser=data.title;               
          }
        }
      ]
    });
    prompt.present();
   
  }

  changePass() {
    let prompt = this.ctrl.create({
      title: 'Change Password',
      message: "Change your Password for a new one",
      inputs: [
        {  
          name: 'title',
          placeholder: 'title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data)
            this.profPass=data.title;
            console.log(this.profPass)
          }
        }
      ]
    });
    prompt.present();
    
   
  }
  
  changeShield() {
    let alert = this.ctrl.create();
    alert.setTitle('Select your role');

    alert.addInput({
      type: 'radio',
      label: 'Pilot',
      value: 'Pilot',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'ATC',
      value: 'ATC',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.profShield=data
      }
    });
    alert.present();
  }
}








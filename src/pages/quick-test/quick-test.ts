import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,AlertController,ModalController, ViewController,LoadingController } from 'ionic-angular';

declare var firebase : any
declare var Recorder : any
var audioPractice = document.createElement('audio')
@Component({
  selector: 'page-quick-test',
  templateUrl: 'quick-test.html'
})

export class QuickTestPage {
    audioPlayer = document.createElement('audio')
  playBtnRecord = false
  tooltip = true
  recBtn = true
  playBtn = true
  pauseBtn = false
  stopBtn = false
  timeLbl = false
  sendRecord = false
  min = 0
  sec = 0
  wAudio : any 
  audioListening : any
  linkAudioListening : any
  audioPlay = true
  audioPause = false
  eeInfo : any
  timer : any
  sendBtn : any 
  statements :any
  page : any
  titlePage : string
  cueCard = false
  divWhiteDescription : string
  questions = []
  listen = false
  subtitle : any
  subtitleText : any
  listAudio = false


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl : LoadingController) {
    this.page = this.navParams.get('page')
    this.titlePage = this.page
    this.pushPage(this.page)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickTestPage');
  }
  pushPage(page){
    switch(page){
      case 'Interview' : 
        this.divWhiteDescription = "Welcome to your aviation exam, in order to start you will have some questions to answer. (Be confident and give your best)"
        this.verifyUser()
      break;

      case 'Scenario' :
        this.divWhiteDescription = "Based on your experience, here you have a scenario related to an emergency situation you as a pilot can encounter. Give a briefing of approximately two minutes’ duration explaining the nature of the scenario and how it may be effectively managed." 
        this.subtitle = true
        this.cueCard = true
        this.subtitleText = "You are going en route and after some communication with the radar atc to get instructions, the readability starts to fail  however, you can hear the atc telling you that he could not identify you on his radar, probably because there is a problem with your transponder. What do you do in that situation?"

      break;

      case 'Back to back' : 
        this.divWhiteDescription = "Listen to the following communication, take notes and prepare a detailed report about the situation. Record your report and send it for feedback." 
        this.subtitle = true
        this.subtitleText = "A controller from the JFK airport has some aircraft out of sequence and is trying to reorganize traffic again. In the communication you will hear Kennedy Ground interacting with a Delta 929, a Hawker 808BL, a Jet blue 1069, and a Delta 1867."
        this.listAudio = true
      break;

      case 'Listening' :
        let loader = this.loadingCtrl.create({
          content : "Please wait..."
        })
        loader.present()
        this.divWhiteDescription = "Listen to the following communication, take notes and read the statements that follow. If the statement is correct select Affirm, if the statement is incorrect select Negative, and if the statement is not contained in the communication select Not Stated." 
        this.subtitle = true
        this.subtitleText = "A controller from the JFK airport has some aircraft out of sequence and is trying to reorganize traffic again. In the communication you will hear Kennedy Ground interacting with a Delta 929, a Hawker 808BL, a Jet blue 1069, and a Delta 1867."
        this.listen = true
        this.tooltip = true
        this.recBtn = false
        this.sendBtn = true
        this.statements = []
        firebase.auth().onAuthStateChanged(user => {
          loader.dismiss()
          firebase.database().ref('userProgress/' + user.uid + '/' + 'initialTestListening').once('value', data =>{
            if(data.val()){
              this.audioListening = data.val().data
              console.log(this.audioListening)
              // this.linkAudioListening = firebase.storage().ref().child('/initialTest/listening/' + a + '.mp3').getDownloadURL()
              // this.storageRef.child(this.audioListening).getDownloadURL().then(url => {
              //   this.linkAudioListening = url
              // })
            } else {
              this.audioListening = 0          
            }
            firebase.storage().ref('initialTest/listening/').child(this.audioListening+1+'.mp3').getDownloadURL().then(url => {
              this.linkAudioListening= url
            })
            firebase.database().ref("initialTestListeningAnswers/"+ this.audioListening).once("value", data => {
              for(let i = 0; i< data.val().length ; i++){
                let num = i+1
                this.statements.push({'id' : i, 'class' : '', 'name' : 'Question '+num, 'answer' : ''})
              }
            })
          });
        })
      break;
    }
  }
  verifyUser(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).once('value' , data => {
          let job = data.val().job
          this.pushQuestions(job)
        })
      }
    })
  }
  pushQuestions(val){
    for(let i=0; i < 2; i++){
      firebase.database().ref('interview' + val).once('value', data => {
        let value = data.val()
        let randonNum = Math.floor((Math.random() * (value.length -1)) + 0)
        this.questions.push({ val : value[randonNum]})
      })
    }
  }


}

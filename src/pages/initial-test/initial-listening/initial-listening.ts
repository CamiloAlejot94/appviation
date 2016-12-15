import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ModalController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { MediaPlugin } from 'ionic-native'

declare var firebase : any
declare var Recorder : any
var audioPractice = document.createElement('audio')//Audio invisible para reproducir los audios de las practicas


@Component({
  selector: 'page-initial-listening',
  templateUrl: 'initial-listening.html',
  
})

export class InitialListening implements OnInit{
  

  audioPlayer = document.createElement('audio') // Objeto audio para poner aqui las pistas a reproducir
  // =====================================================================================================================================
  // PROPIEDADES PARA EL MENÚ DE GRABAR 
  // =====================================================================================================================================
  playBtnRecord = false  
  // Etiqueta sobre el botón de grabar con las indicaciones
  tooltip = true  
  // Botón para grabar el audio
  recBtn = true
  // Botón para reproducir el audio
  playBtn = true
  // Botón para pausar el audio
  pauseBtn = false
  // Botón para detener la grabación
  stopBtn = false
  // Label con el tiempo que corre de grabación
  timeLbl = false
  sendRecord = false // Boton para enviar el audio luego de grabarlo
  // String con los ceros de los minutos y los segundos
  min = 0
  sec = 0
  // En el caso de la entrevista, esta variable toma el audio que el usuario está grabando
  wAudio : any 
  // ====================================================================================================================================
  // TERMINA PROPIEDADES PARA EL MENÚ DE GRABAR 
  // ====================================================================================================================================



  // ====================================================================================================================================
  //  VARIABLES DE LISTENING
  // ====================================================================================================================================
  
  audioListening : any
  linkAudioListening : any

  // ====================================================================================================================================
  // TERMINA VARIABLES DE LISTENING
  // ====================================================================================================================================



  // =========================================================
  // PROPIEDADES PARA EL MENÚ DE REPRODUCCIÓN DE AUDIO
  // =========================================================
  audioPlay = true // Botón por defecto para reproducir el audio que lee de la base de datos, se oculta al reproducir el audio
  audioPause = false // Aparece cuando el botón de reproducción está oculto 

  eeInfo : any
  //FUNCIÓN PARA CONTABILIZAR
  timer : any

  sendBtn : any // Botón para enviar solo en listening

  // LISTENING
  statements :any


  // CONTENIDO GENERAL DE LA PÁGINA
  page : any // Página a la que se está ingresando
  titlePage : string //Titulo del header
  cueCard = false // Mostrar cue card en scenario
  divWhiteDescription : string // Descripción de la ventana superior con la explicación de la práctica
  questions = [] // Preguntas de la entrevista
  listen = false // Único audio con fondo azul
  subtitle : any // Parrafo grande luego de la nube blanca para back to back, scenario, interview.
  subtitleText : any // Texto dentro del subtitulo
  listAudio = false // Listado de audio

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public modalCtrl: ModalController, public navParams : NavParams, public loadingCtrl : LoadingController) {
    this.page = this.navParams.get('page')
    this.titlePage = this.page
    this.pushPage(this.page)
  }

  ngOnInit(){
    this.audioPlayer.onended = () => {
      this.pauseBtn = false
      this.playBtn = true
      this.gif = false
    };
  }

  userProgress(page, data){
    firebase.auth().onAuthStateChanged(user => {
      firebase.database().ref('userProgress/' + user.uid + '/' + page).set({
        data : data
      });
    })
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

  chronometer(val){
      setTimeout(() => {this.setTime(val)}, 1000)
  }

  setTime(val){
    let newVal = val + 1
    if(val == 0){this.min ++}
    if (newVal > 59){
      newVal = 0
    }
    if(this.min != 2){
      this.chronometer(newVal)
    }
    
    this.sec = val
  }

  // COMPRUEBA SI EL USUARIO ESTÁ LOGUEADO Y OBTIENE LOS DATOS DEL MISMO
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

  // MUESTRA LAS PREGUNTAS DE LA ENTREVISTA
  pushQuestions(val){
    for(let i=0; i < 2; i++){
      firebase.database().ref('interview' + val).once('value', data => {
        let value = data.val()
        let randonNum = Math.floor((Math.random() * (value.length -1)) + 0)
        this.questions.push({ val : value[randonNum]})
      })
    }
  }

  showLoading(txt){
    let loader = this.loadingCtrl.create({
      content : txt,
      duration : 2000
    })
    loader.present()
    audioPractice.pause()
    setTimeout(() => {this.navCtrl.pop()}, 1800)
  }

  // COMIENZA  LA GRABACIÓN
  startRecord(page){
    this.tooltip = true
    this.sendRecord = false
    this.playBtnRecord = false  
    this.min = 0
    this.sec = 0
    if (page == 'Interview'){
      let alert = this.alertCtrl.create()
      alert.setTitle('Which audio are you going to record?')

      // BUCLE PARA MOSTRAR LAS DOS OPCIONES DE RESPUESTA
      for(let i = 1; i < 3; i++){
        alert.addInput({
          type : 'radio',
          label : 'Question ' + i,
          value : '' + i,
          checked : false
        })
      }
      // CANCELA EL POPUP QUE SALE
      alert.addButton('Cancel')
      // OPCIONES PARA CUANDO SELECCIONE OK
      alert.addButton({
        text : 'OK',
        handler : data => {
          this.wAudio = data
          this.recBtn = false
          this.stopBtn = true
          this.timeLbl = true
          this.chronometer(1)
        }
      })
      // MANDA EL ALERT SIN MENTE
      alert.present()

      

    } else{
      this.recBtn = false
      this.stopBtn = true
      this.timeLbl = true
      this.chronometer(1)
    }
  }

  
  // TERMINA  LA GRABACIÓN  
  stopRecord(page){
    this.min = 2
    this.sec = 0
    this.sendRecord = true
    
    // A la hora de terminar una grabación, si el usuario está en la entrevista. No aparece el botón play
    if(page == 'Interview'){

      this.stopBtn = false
      this.recBtn = true
      this.timeLbl = false
      
      console.log('Estoy parando de grabar el audio ' + this.wAudio)
      for (let i = 0; i< this.questions.length; i++){
        this.questions[i].audio = false
      }
      this.questions[this.wAudio - 1].audio = true

    } else {
      this.stopBtn = false
      this.recBtn = true
      this.playBtnRecord = true
      this.timeLbl = false
    }

  }

  // playAudio(url){
  //   if(!url){
  //     this.audioPlayer.play()
  //   } else if(url != audioPractice.src){
  //     this.audioPlayer.setAttribute('src', url)
  //     this.audioPlayer.play()
  //   } else{
  //     this.audioPlayer.play()         
  //   }
    
  //   setTimeout(() => {this.pauseBtn = true}, 200)
  //   setTimeout(() => {this.playBtn = false}, 200)
  // }
  
  audioUrl : any
  gif = false
  audioName = "Select an audio"
  
  playAudio(url, audioName){
    if(url){
      this.audioUrl = url 
      this.audioName = audioName
      if(url != this.audioPlayer.src){
        this.audioPlayer.src = url          
        this.audioUrl = url  
        setTimeout(() => {this.pauseBtn = true}, 200)
        setTimeout(() => {this.playBtn = false}, 200)
        this.gif = true    
        this.audioPlayer.play()                    
      }
      else {
        this.gif = true        
        this.audioPlayer.play()
        setTimeout(() => {this.pauseBtn = true}, 200)
        setTimeout(() => {this.playBtn = false}, 200)
      }
    }
    else if (!url){
      if(this.audioUrl){    
        setTimeout(() => {this.pauseBtn = true}, 200)
        setTimeout(() => {this.playBtn = false}, 200)
        this.gif = true      
        this.audioPlayer.play()                            
      }
    }
  }

  pauseAudio(){
    this.gif = false    
    
    if(this.audioUrl == ''){

    } else {
      setTimeout(() => {this.pauseBtn = false}, 200)
      setTimeout(() => {this.playBtn = true}, 200)
      this.audioPlayer.pause()
    }
  }

  // pauseAudio(){
  //   console.log('Estoy pausando el audio')
  //   this.audioPlayer.play()  
  //   setTimeout(() => {this.pauseBtn = false}, 200)
  //   setTimeout(() => {this.playBtn = true}, 200)
  // }

  showPlayer(){
    let value
    if(this.playBtn == true){
      value = 'play' 
    } else{
      value = 'pause'
    }
    let modal = this.modalCtrl.create(InitialPlayer, {controls : value});
    modal.present()
    modal.onDidDismiss(data => {
      if(data == 'play'){
        this.playBtn = true;
      }else {
        this.pauseBtn = true;
      }
    });
  }

  // ====================================================================================================================================================================
  // METODOS PARA LISTENING
  // ====================================================================================================================================================================

  response(statement, val){
    if(val){
      this.statements[statement].answer = "audio_answer_" + val
    }
    if(this.statements[statement].class != 'float-div-animation'){
      this.statements[statement].class = 'float-div-animation'
    } else{
      this.statements[statement].class = ''
    }
    
  }
s = []
  sendAnswer(audio){
    let answers = 0
    firebase.database().ref('initialTestListeningAnswers').on('value', data => {
      let firebaseData = data.val()[audio];
      for(let i = 0; i< this.statements.length; i++){
        if(this.statements[i].answer == 'audio_answer_'+firebaseData[i]){
          // console.log('Respuesta ' + i + ' correcta')
          answers ++
          //Cuando estén todas las respuestas bien contestadas
        } else {}
      }
      if(answers == this.statements.length){
        this.userProgress('initialTestListening', audio+1)
        let alert = this.alertCtrl.create({
          title : 'Audio ' + (this.audioListening + 1),
          subTitle : 'Excelent',
          buttons : [{
            text : 'Cancel',
            handler : data => {
              this.navCtrl.pop()
            }
          },
          {
            text : 'Continue',
            handler : data => {
              this.pushPage('Listening')
            }
          }]
        })
        alert.present()  
      } else{
        let alert = this.alertCtrl.create({
          title : 'Audio ' + (this.audioListening + 1),
          subTitle : answers + ' out of ' + this.statements.length,
          buttons : ['Try again']
        })
        alert.present()      
      }
    })
    
  }

  // ====================================================================================================================================================================
  // FINALIZA METODOS PARA LISTENING
  // ====================================================================================================================================================================  

  helpMenu(){
    let alert = this.alertCtrl.create({
      title : 'Help',
      message : 'Have any questions?',
      inputs : [
        {
          name : 'message',
          placeholder : 'Message'
        }
      ],
      buttons : [
        {
          text : 'Cancel',
          handler : data => {
          } 
        },
        {
          text : 'Send',
          handler : data => {
            console.log("Enviando")
          } 
        }
      ]
    })
    alert.present()
  }

  showCueCard(){
    let modal = this.modalCtrl.create(CueCard);
    modal.present()
  }
  

}


// ========================================================================================================================
// ===================================================== VENTANA MODAL =====================================================
// ========================================================================================================================

@Component({
  selector: 'page-cue-card',
  templateUrl: 'cue-card.html'
})


export class CueCard {

  subMenu = false

  constructor(public viewCtrl: ViewController) {
  }

  showSubmenu(){
    this.subMenu = !this.subMenu
  }

  closeModal(){
    this.viewCtrl.dismiss()
  }

}

// ========================================================================================================================
// ===================================================== REPRODUCTOR MUSICAL =====================================================
// ========================================================================================================================


@Component({
  selector: 'page-initial-player',
  templateUrl: 'initial-player.html'
})


export class InitialPlayer implements OnInit {

  playBtn = true
  pauseBtn = false
  audioTime = 0

  playPercent
  duration : any
  a = document.createElement('audio')
  seg = 0

  constructor( public viewCtrl: ViewController, params: NavParams) {
    if(params.get('controls') == 'pause'){
      this.pauseBtn = true;
      this.playBtn = false;
    } else {     
    }
  }

  ngOnInit(){
    this.a.addEventListener("timeupdate", this.timeUpdate, true)
    if(this.a.onplay){
      setTimeout(() => {this.audioTime = parseInt(audioPractice.currentTime.toFixed(0));console.log('hola')}, 1000)        
    }
  }
  
  timeUpdate(){
    this.playPercent = 100 * (audioPractice.currentTime / this.duration);
  }

  playAudio(url){

    if(url != this.a.src && url != audioPractice.src){
      this.a.setAttribute('src', url)      
      //audioPractice.setAttribute('src', url)      
    }
    this.a.play()
    //audioPractice.play()
    //audioPractice.muted = true
    
    setTimeout(() => {this.pauseBtn = true}, 200)
    setTimeout(() => {this.playBtn = false}, 200)
  }

  pauseAudio(){
    setTimeout(() => {this.pauseBtn = false}, 200)
    setTimeout(() => {this.playBtn = true}, 200)
    this.a.pause()
    //audioPractice.pause()
  }

  closeModal(){
    let value
    if(this.playBtn == true){
      value = 'play'
    } else {     
      value = 'pause'      
    }
    this.viewCtrl.dismiss(value)
  }

}
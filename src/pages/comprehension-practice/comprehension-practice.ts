import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

declare var firebase
declare var globalBlob
var audioPractice = document.createElement('audio')//Audio invisible para reproducir los audios de las practicas
//var audioRec = document.getElementById('recording')//Audio invisible que el usuario está grabando


@Component({
  selector: 'page-comprehension-practice',
  templateUrl: 'comprehension-practice.html'
})

export class ComprehensionPractice {

  //====VARIABLES FIREBASE===//
  firebaseAudios : any //Trae toda la información de los audios de las prácticas
  storage = firebase.storage()
  storageRef = this.storage.ref('/audios/comprehension')

  //Subir archivos con firebase
  uploadRef = firebase.storage().ref();
  uploadTask : any
  
  

  //====VARIABLES PRACTICA===//
  playAudioPractice = true //Botón al al lado del audio
  contentLoad = false //Div con todo el contenido de la práctica
  practice : any; // Recibe el valor del ejercicio y la practica a la que el usuario está ingresando
  title : string; // Titulo principal del archivo (ion-title)
  section : string; // Párrafo con la explicación de la práctica
  audios : any; // Variable para pasar lo audios de la matriz

  //====VARIABLES DE REPRODUCCIÓN O GRABACIÓN===//
  noListening = true // Contenido general para la practicas que no son de listening
  wAudioClass = ['','','','','']; //Clases para cada uno de los audios
  p1 = "Tap to record,"; // Parrafo sobre el boton de grabar
  p2 = "tap again to stop."; // Salto de linea del parrafo sobre el boton de grabar
  timer : any;
  seg = 3;
  recb = true // Boton comenzar la grabacion
  stopb = false; // Boton para parar la grabacion
  repeatb = false //Botoón para volver a grabar
  playb = false //Reproduce lo que grabe
  sendb = false //Enviar la practica "send"
  helpb = true //Botón de ayuda inferior izquierdo
  waveVoice = false; // Gif que hace el efecto de las ondas de voz
  waveVoiceStatic = false; // Gif de la voz
  wAudiob = false; // Boton para seleccionar el audio que el usuario va a grabar
  segPractice = false; //Temporizador, muestra los segundos

 //====CAMBIO DE BOTONES PARA REPRODUCIR LA PRÁCTICA===//
  playBackButton = "assets/img/play_practice.svg" //Este botón cambia dependiendo de la acción que se esté ejecutando.. pausa, play o cargando
  buttonStatement : any

  //====VARIABLES DE LISTENING===//
  pListening = false // Todo el contenido para listen ejercicios 3,6,9,10
  firebaseStatements : any
  statements : any;

  //====VECTORES CON LA INFORMACIÓN DE LAS PRÁCTICAS (TITULO Y PÁRRAFO DESCRIPTIVO)===//
  titles =["Practice 1", "Practice 2", "Practice 3"];
  sections = ["Listen to the following parts of a communication and explain in your own words what you understand.", //1-1 , 4-1, 7-1
  "Listen to the following parts of a communication and ask a question to the person in the communication.", //1-2, 4-2, 7-2
  "Listen to the following parts of a communication and give advice to the person in the communication.", //1-3, 4-3 , 7-3
  "Listen to the following communication, take notes and prepare a detailed report about the situation. Record your report and send it for feedback.", //2-1 , 5-1, 8-1
  "Listen to the following communication, take notes and read the statements that follow. If the statement is correct select 'Affirm', if the statement is incorrect select 'Negative', and if the statement is not contained in the communication select 'Not Stated'."//3, 6, 9, 10
  ];

  constructor(public navCtrl: NavController, navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.practice = navParams.get('practice')
    this.pushTitle()
    audioPractice.setAttribute('type', 'audio/mpeg')
    audioPractice.setAttribute('id', 'audioPractice') 
  }

  //Si esta clase no funciona. Poner onInit
  ionViewDidLoad() {
    firebase.database().ref('/comprehensionPractice').once('value', snap => {
      let firebaseData = snap.val()
      this.firebaseStatements = firebaseData.statements
      this.firebaseAudios = firebaseData.audioList
      this.pushContent()
    }).then(() => this.contentLoad=true)
  }

  //Método para inyectar el nombre del titulo en la cabecera del documento
  pushTitle(){

    if(this.practice == "1-1" ||
      this.practice == "2-1" ||
      this.practice == "3-1" ||
      this.practice == "4-1" ||
      this.practice == "5-1" ||
      this.practice == "6-1" ||
      this.practice == "7-1" ||
      this.practice == "8-1" ||
      this.practice == "9-1" ||
      this.practice == "10-1")
    {
      this.title = this.titles[0];
    }
    else if (this.practice == "1-2" ||
      this.practice == "4-2" ||
      this.practice == "7-2")
    {
      this.title = this.titles[1];
    }
    else if (this.practice == "1-3" ||
      this.practice == "4-3" ||
      this.practice == "7-3")
    {
      this.title = this.titles[2];
    }
    else {
      this.title = this.titles[0];
    }
  }

  //Inyecta los audios de la práctica y el párrafo explicativo
  pushContent(){

    switch(this.practice){

      case "1-1" :
      this.section = this.sections[0];
      this.audios = this.firebaseAudios[0]
      break;

      case "1-2" :
      this.section = this.sections[1];
      this.audios = this.firebaseAudios[1]
      break;

      case "1-3" :
      this.section = this.sections[2];
      this.audios = this.firebaseAudios[2]
      break;

      case "2-1" :
      this.section = this.sections[3];
      this.audios = this.firebaseAudios[3]
      break;

      case "3-1" :
      //this.pageListening = 3;
      this.pListening = true
      this.noListening = false
      this.section = this.sections[4];
      this.audios = this.firebaseAudios[4]
      this.statements = this.firebaseStatements[3]
      break;

      case "4-1" :
      this.section = this.sections[0];
      this.audios = this.firebaseAudios[5]
      break;

      case "4-2" :
      this.section = this.sections[1];
      this.audios = this.firebaseAudios[6]
      break;

      case "4-3" :
      this.section = this.sections[2];
      this.audios = this.firebaseAudios[7]
      break;

      case "5-1" :
      this.section = this.sections[3];
      this.audios = this.firebaseAudios[8]
      break;

      case "6-1" :
      //this.pageListening = 6;
      this.pListening = true
      this.noListening = false
      this.section = this.sections[4];      
      this.audios = this.firebaseAudios[9]
      this.statements = this.firebaseStatements[6]
      break;

      case "7-1" :
      this.section = this.sections[0];
      this.audios = this.firebaseAudios[10]
      break;

      case "7-2" :
      this.section = this.sections[1];
      this.audios = this.firebaseAudios[11]
      break;

      case "7-3" :
      this.section = this.sections[2];
      this.audios = this.firebaseAudios[12]
      break;

      case "8-1" :
      this.section = this.sections[3];
      this.audios = this.firebaseAudios[13]
      break;

      case "9-1" :
      //this.pageListening = 9;
      this.pListening = true
      this.noListening = false
      this.section = this.sections[4];      
      this.audios = this.firebaseAudios[14]
      this.statements = this.firebaseStatements[9]
      break;

      case "10-1" :
      //this.pageListening = 10;
      this.pListening = true
      this.noListening = false
      this.section = this.sections[4];      
      this.audios = this.firebaseAudios[15]
      this.statements = this.firebaseStatements[10]
      break;

    }

  }

  //Reproduce los audios en las practicas
  playAudio(name, link){

    console.log('Cargando...')
    //this.playBackButton = "assets/img/pause_practice.svg"
    this.storageRef.child(link).getDownloadURL().then( url => {
      audioPractice.setAttribute('src', url)
      audioPractice.play()
      console.log(url)
      this.playBackButton = "assets/img/play_practice.svg"
      // console.log('Ya cargó' + this.playBackButton)
    }).catch(function(error) {
      switch (error.code) {
      case 'storage/object_not_found':
        console.log('El archivo no existe')
      break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log('No tienes permisos para acceder')
      break;

      case 'storage/canceled':
        // User canceled the upload
        console.log('Se ha cancelado la descarga')
      break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('No se ha podido establecer conexión con el servidor')      
      break;
      }
    })
    audioPractice.onended = function(){ console.log(this.title) }
  }//Acaba el método playAudio

  //Graba la practica
  recPractice(){
    this.recb = !this.recb;
    this.wAudiob = !this.wAudiob;
    this.helpb = !this.helpb;
    this.p1 = "Which audio are you";
    this.p2 = "going to record?";
  }

  //Pregunta al usuario qué audio desea grabar
  whichAudio(audio){

    if(this.wAudioClass[audio-1] == "wAudio-selected"){
      this.wAudioClass[audio-1] = "";
    } else{
      this.wAudioClass[audio-1]="wAudio-selected";
    };
    this.p1 = "";
    this.p2 = "";
    this.timer = setTimeout(() => this.seg, 0);
    this.timer = setTimeout(() => this.seg=2, 1000);
    this.timer = setTimeout(() => this.seg=1, 2000);
    this.timer = setTimeout(() => this.stopb = !this.stopb, 3000);
    //La grabación la está controlando el index con el script myRecordData
    this.timer = setTimeout(() => this.waveVoice = true, 4500);
    this.waveVoiceStatic = true;
    this.wAudiob = false;
    this.segPractice = !this.segPractice;
  }

  //Para la grabación
  stopPractice(){
    this.stopb = !this.stopb;
    this.repeatb = !this.repeatb;
    this.playb = !this.playb;
    this.sendb = !this.sendb;
    this.segPractice = !this.segPractice;
    this.waveVoiceStatic = false;
    this.waveVoice = false;
    this.p1 = "Tap to record";
    this.p2 = "again.";
    console.log("Para la grabacion");
  }

  repeatPractice(){
    this.repeatb = !this.repeatb;
    this.sendb = !this.sendb;
    this.playb = !this.playb;
    this.p1 = "";
    this.p2 = "";
    this.segPractice = !this.segPractice;
    this.timer = setTimeout(() => this.seg=3, 0);
    this.timer = setTimeout(() => this.seg=2, 1000);
    this.timer = setTimeout(() => this.seg=1, 2000);
    this.timer = setTimeout(() => this.stopb = !this.stopb, 3000);
    //La grabación la está controlando el index con el script myRecordData
    this.timer = setTimeout(() => this.waveVoice = true, 4500);
    this.waveVoiceStatic = true;
  }

  sendAudio(){
    let confirm = this.alertCtrl.create({
      title: 'Good job!',
      message: 'Your recording will be checked by one of our specialized instructors. Feedback will be sent to you soon',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Send',
          handler: () => {
            console.log('Agree clicked');
            this.sendingAudio()
          }
        }
      ]
    });
    confirm.present();
  }

  //Este método se encarga de subir el archivo que el usuario grabó a la base de datos firebase
  sendingAudio(){
    this.uploadTask = this.uploadRef.child('comprehension/loPudeSubir.wav').put(globalBlob);

    let loader = this.loadingCtrl.create({
      content: "Sending audio...",
      duration: 3000
    });
    loader.present();
    
  }

  //================================================================================================================================================
  //===============================================METODOS PARA PRACTICE LISTENING=================================================================
  //================================================================================================================================================

  //ABRE LA nube flotante
  viewFloatStatement(val){
    if (this.statements[val-1].cl == 'float-answer-view'){
      this.statements[val-1].cl = 'float-answer'
    } else{
      for(var i=0; i<this.statements.length; i++){
        this.statements[i].cl = 'float-answer'
      }
      this.statements[val-1].cl = 'float-answer-view'
    }
  }

  changeButton(id, button){
    if(button == 1){
      //this.loadingAudioC = true
      //this.playAudioC = false
      //this.pauseAudioC = false
    }
    console.log('Pongo a cargar el Audio '+ id)
    //this.buttonStatement[id-1] = 'loading_audio.gif'
    console.log(this.buttonStatement[id-1])
  }

  //Selecciona la respuesta que considera correcta
  selectStatement(id, val){
    if(val == 1){
      this.statements[id-1].select = 'affirm'
    } else if (val == 2){
      this.statements[id-1].select = 'negative'
    } else {
      this.statements[id-1].select = 'notStated'
    }
    console.log ('Estoy seleccionando : ' +  val)
  }

  doneListening(){
    
  }

}

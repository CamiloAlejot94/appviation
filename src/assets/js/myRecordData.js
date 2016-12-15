
var audio_context;
var recorder;
var url;
var audio = document.getElementById("recording");


function startUserMedia(stream) {
  var input = audio_context.createMediaStreamSource(stream);
  console.log('Se ha creado Media stream.');
  recorder = new Recorder(input);
  console.log('Grabadora inicializada.');
}

function startRecording(practice) {
  console.log(practice)
  recorder && recorder.record();
  console.log('Grabando...');
}

function stopRecording(practice) {
  recorder && recorder.stop();
  console.log('Lista la grabación.');

  // create WAV download link using audio data blob
  createDownloadLink();

  recorder.clear();
}

function playRecord(audio){
  var audio = document.getElementById('recording');
  audio.play();
  console.log('Reproduce lo que grabé')
  console.log(audio.src)
}

function createDownloadLink() {

  recorder && recorder.exportWAV(function(blob) {
    url = URL.createObjectURL(blob);
    var audio = document.getElementById('recording');
    audio.controls = true;
    audio.src = url;
    console.log('Archivo Blob : ' + blob)
  });
}

window.onload = function init() {
  try {
    // webkit shim
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audio_context = new AudioContext;
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'disponible.' : 'No funciona!'));
  } catch (e) {
    alert('Este navegador no tiene soporte para web audio!');
  }

  navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
    console.log('Se denegaron permisos para usar el audio : ' + e);
  });
};
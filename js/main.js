//Variable que obtiene referencia a la Base de Datos
var database = firebase.database();
//Variables que obtienen referencia a los contenedores de la Base de Datos
var turno = database.ref("turno");
var nombres = database.ref("nombres");
var ventanillas = database.ref("ventanillas");
//Variables que obtienen referencia a hijos especificos
var turnoActual = ventanillas.child("ultVenVal");
var turnoAnterior = ventanillas.child("penUltVal");
var nombreActual = ventanillas.child("ultName");
var nombreAnterior = ventanillas.child("penUltName");

//Funciones del reloj
//Reloj obtenido de: https://codepen.io/Tcip/pen/BNKjeN
//================================================

var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  //var d = new Date();
  document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}

/*
ventanillas.on('value', function(snapshot) {
  var sound = document.getElementById("beepBtn");
  sound.play();
  var ventanaActualValor = snapshot.child('ult').val();
  var ventanaAnteriorValor = snapshot.child('penUlt').val();
  var turnoActualValor = ventanillas.child("ultVenVal").val();
  var turnoAnteriorValor = ventanillas.child("penUltVal").val();
  var nombreActualValor = ventanillas.child("ultName").val();
  var nombreAnteriorValor = ventanillas.child("penUltName").val();
  //document.getElementById("ultT").innerHTML =  "Turno Actual:    " + turnoActualValor + " | Asistente: " + nombreActualValor;
  //  document.getElementById("pultT").innerHTML = "Turno Anterior: " + turnoAnteriorValor + " | Asistente: " + nombreAnteriorValor;
  
  nombres.once('value').then(function(snapshot){
    document.getElementById("ultT").innerHTML =  "Ultimo turno:    " + ultVenVal + " | Asistente: " + snapshot.child(ultVenVal).val();
    document.getElementById("pultT").innerHTML = "Penultimo turno: " + turnoAnterior + " | Asistente: " + snapshot.child(penUltVal).val();
  })
  

})
*/


//Descripción: Obtiene los elementos de la base de datos y luego los actualiza en la página web
//=============================================================================================

nombreAnterior.on('value', function(snapshot){
  var nombreAnteriorValor = snapshot.val();
  turnoAnterior.once('value').then(function(snapshot){
    document.getElementById("pultT").innerHTML = "Penultimo turno: " + snapshot.val() + " | Asistente: " + nombreAnteriorValor;
  })
})

nombreActual.on('value', function(snapshot) {
  var nombreActualValor = snapshot.val();
  turnoActual.once('value').then(function(snapshot){
    document.getElementById("ultT").innerHTML =  "Ultimo turno:    " + snapshot.val() + " | Asistente: " + nombreActualValor;
  })
})



/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var desp = database.ref("desp");
var nombres = database.ref("nombres");
var ventanillas = database.ref("ventanillas");
var venUlt = ventanillas.child("ult");
var penVenUlt = ventanillas.child("penUlt");
var ultVal = ventanillas.child("ultVenVal");
var penUltVal = ventanillas.child("penUltVal");
var reg = database.ref("registro");
var t1 = document.getElementById("0");
var t2 = document.getElementById("1");


'=============================================================================='
'|||||||||||||||||||||||||||||       Metodo       |||||||||||||||||||||||||||||'
'=============================================================================='

/*==============================================================================
t1 = Último turno
t2 = Penúltimo turno
t3 = Antepenúltimo turno
t4 = Anteantepenúltimo turno

Descripción: Obtiene los elementos del documento y luego los actualiza con la
información correcta.
==============================================================================*/

/* reloj */
// obtenido de: https://codepen.io/Tcip/pen/BNKjeN
var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  //var d = new Date();
  document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}

ventanillas.on('value', function(snapshot) {
  var ultVen = snapshot.child('ult').val();
  var penUlt = snapshot.child('penUlt').val();
  var ultVenVal = snapshot.child('ult').val();
  var penUltVal = snapshot.child('penUlt').val();
  nombres.once('value').then(function(snapshot){
    document.getElementById("ultT").innerHTML =  "Ultimo turno:    " + ultVenVal + " | Asistente: " + snapshot.child(ultVenVal).val();
    document.getElementById("pultT").innerHTML = "Penultimo turno: " + penUltVal + " | Asistente: " + snapshot.child(penUltVal).val();
  })

})

penVenUlt.on('value', function(snapshot){
  var penUltVenVal = snapshot.val();
  penUltVal.once('value').then(function(snapshot){
    document.getElementById("pultT").innerHTML = "Penultimo turno: " + penUltVenVal + " | Asistente: " + snapshot.val();
  })
})

venUlt.on('value', function(snapshot) {
  var ultVen = snapshot.val();
  ultVal.once('value').then(function(snapshot){
    document.getElementById("ultT").innerHTML =  "Ultimo turno:    " + snapshot.val() + " | Asistente: " + ultVen;
  })
})

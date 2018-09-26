/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var desp = database.ref("desp");
var ventanillas = database.ref("ventanillas");
var reg = database.ref("registro");

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
function actualizaTurnos(){
  var t  = document.getElementById("turno");
  var v  = document.getElementById("vent");
  var t1 = document.getElementById("0");
  var t2 = document.getElementById("1");
  var t3 = document.getElementById("2");
  var t4 = document.getElementById("3");
  ventanillas.once('value').then(function(snapshot){
    t1.innerHTML = "Turno: " + snapshot.child(1).val() + " | Ventanilla: 1";
    t2.innerHTML = "Turno: " + snapshot.child(2).val() + " | Ventanilla: 2";
    t3.innerHTML = "Turno: " + snapshot.child(3).val() + " | Ventanilla: 3";
    t4.innerHTML = "Turno: " + snapshot.child(4).val() + " | Ventanilla: 4";
  })
}


/* reloj */
// obtenido de: https://codepen.io/Tcip/pen/BNKjeN
var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}

var myVar2 = setInterval(function() {
  var firstTime=true;
  reg.once('value').then(function(snapshot){
    if(!snapshot.exists()){
      if(!firstTime){
        turno.once('value').then(function(snapshot){
        t.innerHTML = snapshot.child("turn").val() + snapshot.child("desp").val();
        v.innerHTML = snapshot.child("lastVen").val();
        firstTime=false;
        })
      }
    }
    actualizaTurnos();
  })
}, 5000)

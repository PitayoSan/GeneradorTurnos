/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var ventanillas = database.ref("ventanillas");
var ven1 = ventanillas.child("1");
var ven2 = ventanillas.child("2");
var ven3 = ventanillas.child("3");
var ven4 = ventanillas.child("4");
var ven5 = ventanillas.child("5");
var ven6 = ventanillas.child("6");
var ven7 = ventanillas.child("7");
var ven8 = ventanillas.child("8");
var venUlt = ventanillas.child("ult");
var ultName = ventanillas.child("ultName");
var penUltName = ventanillas.child("penUltName");
var penVenUlt = ventanillas.child("penUlt");
var ultVal = ventanillas.child("ultVenVal");
var penUltVal = ventanillas.child("penUltVal");
var penultimo=0;

function getPenUltVenVal() {
  penVenUlt.once('value').then(function(snapshot){
    penultimo = snapshot.val();
  })
}


/*==============================================================================
turno = direccion de firebase
t     = elemento del documento donde va "turnos"
turn  = numero de turno

Descripción: Genera un nuevo turno en función del turno actual
==============================================================================*/
function genTurn() {
  turno.once('value').then(function(snapshot){
    setTurn(snapshot.val()+1);
    ventanillas.child('ultVenVal').set(snapshot.val());
    ventanillas.child('penUltVal').set(snapshot.val()-1);
  })
}

/*==============================================================================
x = numero de turno

Descripción: Actualiza el turno en la base de datos
==============================================================================*/
function setTurn(x){
  turno.set(x);
}

/*==============================================================================
Descripción:
==============================================================================*/

function asignaVenByID(ven, name){
  ultName.once('value').then(function(snapshot){
    penUltName.set(snapshot.val());
  })
  ultName.set(name);
  venUlt.once('value').then(function(snapshot) {
    ventanillas.child('penUlt').set(penultimo);
    penultimo = snapshot.val();
  })
  venUlt.set(ven);
  turno.once('value').then(function(snapshot){
      ventanillas.child(ven).set(snapshot.val()%100);
  })
}

/*==============================================================================
t1 = Último turno
t2 = Penúltimo turno
t3 = Antepenúltimo turno
t4 = Anteantepenúltimo turno

Descripción: Obtiene los elementos del documento y luego los actualiza con la
información correcta.
==============================================================================*/
ven1.on('value', function(snapshot){
  document.getElementById("0").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Chuy";
})

ven2.on('value', function(snapshot){
  document.getElementById("1").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Albino";
})

ven3.on('value', function(snapshot){
  document.getElementById("2").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Jesús";
})

ven4.on('value', function(snapshot){
  document.getElementById("3").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Josué";
})

ven5.on('value', function(snapshot){
  document.getElementById("4").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Carlos";
})

ven6.on('value', function(snapshot){
  document.getElementById("5").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Lety";
})

ven7.on('value', function(snapshot){
  document.getElementById("6").innerHTML = "Turno: " + snapshot.val() + " | Asistente: César";
})

ven8.on('value', function(snapshot){
  document.getElementById("7").innerHTML = "Turno: " + snapshot.val() + " | Asistente: Daniel";
})


/*==============================================================================
Descripción: Actualiza el estado de una ventanilla a "false" (ocupado) y es
asignado un turno a ella
==============================================================================*/
function available1(){
  genTurn();
  asignaVenByID(1,"Chuy");
}
function available2(){
  genTurn();
  asignaVenByID(2,"Albino");
}
function available3(){
  genTurn();
  asignaVenByID(3,"Jesus");
}
function available4(){
  genTurn();
  asignaVenByID(4,"Josue");
}
function available5(){
  genTurn();
  asignaVenByID(5,"Carlos");
}
function available6(){
  genTurn();
  asignaVenByID(6,"Lety");
}
function available7(){
  genTurn();
  asignaVenByID(7,"Cesar");
}
function available8(){
  genTurn();
  asignaVenByID(8,"Daniel");
}

function updateTurn() {
  turno.set(parseInt(document.getElementById("tfDesp").value));
  document.getElementById("tfDesp").value = "";
}

var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}

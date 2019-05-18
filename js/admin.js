//Variable que obtiene referencia a la Base de Datos
var database = firebase.database();
//Variables que obtienen referencia a los contenedores de la Base de Datos
var turno = database.ref("turno");
var ventanillas = database.ref("ventanillas");
var nombres = database.ref("nombres");
//Variables que obtienen referencia a hijos especificos
var ven1 = ventanillas.child("1");
var ven2 = ventanillas.child("2");
var ven3 = ventanillas.child("3");
var ven4 = ventanillas.child("4");
var ven5 = ventanillas.child("5");
var ven6 = ventanillas.child("6");
var ven7 = ventanillas.child("7");
var ven8 = ventanillas.child("8");
var ventanaActual = ventanillas.child("ult");
var nombreActual = ventanillas.child("ultName");
var nombreAnterior = ventanillas.child("penUltName");
var ventanaPrevia = ventanillas.child("penUlt");
var turnoActual = ventanillas.child("ultVenVal");
var turnoAnterior = ventanillas.child("penUltVal");
//Variables de ventana y nombre previos. Se inicializan con los datos de la base de datos
var penultimaVentana=ventanaPrevia;
var penultimoNombre=nombreAnterior;

//Funciones para obtener ventana y nombres previos
//====================================================

function getPenUltVenVal() {
  ventanaPrevia.once('value').then(function(snapshot){
    penultimaVentana = snapshot.val();
  })
  nombreAnterior.once('value').then(function(snapshot){
    penultimoNombre = snapshot.val();
  })
}


//Descripción: Genera un nuevo turno en función del turno actual
//El nuevo turno generado será el turno almacenado en la variable turno,
//y por ende, la variable turno aumentará una unidad
//=====================================================================

function genTurn() {
  turnoActual.once('value').then(function(snapshot){
    turnoAnterior.set(snapshot.val());
  })
  turno.once('value').then(function(snapshot){
    turnoActual.set(snapshot.val());
    if(snapshot.val() == 99) {
      setTurn(1);
    } else {
      setTurn(snapshot.val()+1);
    }
  })
}

//Descripción: Actualiza el turno en la base de datos
//=====================================================

function setTurn(numeroTurno){
  turno.set(numeroTurno);
}

/*
Descripción:
-reproduce el sonido
-Actualiza las variables del nombre actual y el nombre anterior
-Actualiza las variables de la ventana actual y la ventana anterior
==============================================================================
*/

function asignaVenByID(ven, name){
  var sound = document.getElementById("beepBtn");
  sound.play();
  nombreActual.once('value').then(function(snapshot){
    ventanillas.child('penUltName').set(penultimoNombre);
    penultimoNombre = snapshot.val();
  })
  nombreActual.set(name);
  ventanaActual.once('value').then(function(snapshot) {
    ventanillas.child('penUlt').set(penultimaVentana);
    penultimaVentana = snapshot.val();
  })
  ventanaActual.set(ven);
  turno.once('value').then(function(snapshot){
      ventanillas.child(ven).set(snapshot.val());
  })
}

function cambiarNombreAnterior() {

}

//Descripción: Obtiene los elementos de la página web y luego los actualiza con la información correcta
//=====================================================================================================

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



//Descripción: Actualiza el estado de una ventanilla asignandole su turno correspondiente y llama a otra función
//para actualizar la base de datos
//=================================================================================================================

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

//Descripción: actualiza el valor del turno actual en la base de datos segun lo que el usuario ingresa en la casilla
//==================================================================================================================
function updateTurn() {
  if(parseInt(document.getElementById("tfDesp").value) < 100 && parseInt(document.getElementById("tfDesp").value) > 0) {
    turno.set(parseInt(document.getElementById("tfDesp").value));
    document.getElementById("tfDesp").value = "";
  }
}

var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  document.getElementById("clock").innerHTML = new Date().toLocaleTimeString();
}

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
turno = direccion de firebase
t     = elemento del documento donde va "turnos"
turn  = numero de turno

Descripción: Genera un nuevo turno en función del turno actual
==============================================================================*/
function genTurn() {
  turno.once('value').then(function(snapshot){
    var t = document.getElementById("turno");
    var nTurno= snapshot.child('turn').val()+1;
    t.innerHTML = nTurno + snapshot.child('desp').val();
    setTurn(nTurno);
    queueTurn(nTurno);
  })
}


/*==============================================================================
x = turno generado

Descripción: Guarda el ultimo dato en una queue.
==============================================================================*/

function queueTurn(x) {
  reg.once('value').then(function(snapshot){
    var nSnap=snapshot.numChildren();
    if(nSnap==0){
      reg.child(1).set(x);
    } else {
      reg.child(nSnap+1).set(x);
    }
  })
}

function dequeueTurn() {
  reg.once('value').then(function(snapshot){
    var nSnap=snapshot.numChildren();
    for(i=1;i<nSnap;i++){
      reg.child(i).set(snapshot.child(i+1).val());
    }
    reg.child(nSnap).remove();
  })
}


/*==============================================================================
x = numero de turno

Descripción: Actualiza el turno en la base de datos
==============================================================================*/
function setTurn(x){
  turno.child('turn').set(x);
}

/*==============================================================================

==============================================================================*/
function check4Win(){

}


/*==============================================================================
y = ventana (hijo)
z = valor de la ventana

Descripción: Actualiza la cola de la ventanilla
==============================================================================*/

function actualizaVen(ven) {
  turno.once('value').then(function(snapshot){
    var nTurno=snapshot.child('turn').val();
  })
  ventanillas.child(ven).set(nTurno);
}

/*==============================================================================
x = turno
y = ventanilla

Descripción: Desplaza los primeros 3 turnos 1 posición para dejar espacio para
el nuevo turno, y luego lo guarda en la primer posición.
==============================================================================*/

function guardaTurno(x,y) {
  reg.once('value').then(function(snapshot){
    reg.child(3).update(snapshot.child(2).val());
    reg.child(2).update(snapshot.child(1).val());
    reg.child(1).update(snapshot.child(0).val());
    var newData = {
      "turn": x,
      "ven": y
    };
    reg.child(0).update(newData);
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
function actualizaTurnos(){
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


/*==============================================================================
Descripción:
==============================================================================*/

function asignaVenByID(ven){
  reg.once('value').then(function(snapshot){
    if(snapshot.child(1).val()!=null){
      ventanillas.child(ven).set(snapshot.child(1).val());
    } else {
      console.log("No hay turnos disponibles")
    }
    dequeueTurn();
  })
}


/*==============================================================================
Descripción: Actualiza el estado de una ventanilla a "false" (ocupado) y es
asignado un turno a ella
==============================================================================*/
function available1(){
  ventanillas.once('value').then(function(snapshot){
    if(snapshot.child(1).val() != true){
      ventanillas.child(1).set(true);
      asignaVenByID(1);
    } else {
      asignaVenByID(1);
    }
  })
}
function available2(){
  ventanillas.once('value').then(function(snapshot){
    if(snapshot.child(2).val() != true){
      ventanillas.child(2).set(true);
      asignaVenByID(2);
    } else {
      asignaVenByID(2);
    }
  })
}
function available3(){
  ventanillas.once('value').then(function(snapshot){
    if(snapshot.child(3).val() != true){
      ventanillas.child(3).set(true);
      asignaVenByID(3);
    } else {
        asignaVenByID(3);
    }
  })
}
function available4(){
  ventanillas.once('value').then(function(snapshot){
    if(snapshot.child(4).val() != true){
      ventanillas.child(4).set(true);
      asignaVenByID(4);
    } else {
      asignaVenByID(4);
    }
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

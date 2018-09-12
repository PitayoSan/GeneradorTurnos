//Obtener elementos
var t = document.getElementById("turn");
var v = document.getElementById("vent");

//Obtener path's de los childs por separado
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
    t.innerHTML = snapshot.child('turn').val()+snapshot.child('desp').val();
    asignaVen(snapshot.child('turn').val(),snapshot.child('desp').val());
  })
}

/*==============================================================================
x = numero de turno

Descripción: Actualiza el turno en la base de datos
==============================================================================*/
function setTurn(x){
  turno.child('turn').set(x+1);
}



/*==============================================================================
v = elemento ventanillas del documento
min = ventanilla con menor cantidad de
x = turno a guardar
y = desplazamiento de turnos

Descripción: Asigna la ventanilla con menor cola, a la vez que recibe los dos
para posteriormente pasarlos a "newData" y "guardaTurno" para la actualizacion del nuevo turno en el registro
de los últimos 4.
==============================================================================*/

function asignaVen(x,y) {
  setTurn(x);
  ventanillas.once('value').then(function(snapshot){
    var v = document.getElementById("vent");
    var min = 1;
    for(i=1;i<=snapshot.numChildren();i++){
      if(snapshot.child(min).val()>snapshot.child(i).val()){
        min=i;
      }
    }
    v.innerHTML = min;
    actualizaVen(min,snapshot.child(min).val());
    var newData = {
      turn: x,
      ven: min
    };
    var updates = {};
    updates[firebase.database]
    guardaTurno(x+y,min);
  })
}

/*==============================================================================
y = ventana (hijo)
z = valor de la ventana

Descripción: Actualiza la cola de la ventanilla
==============================================================================*/

function actualizaVen(y,z) {
  ventanillas.child(y).set(z+1);
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
    actualizaTurnos();
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
  reg.once('value').then(function(snapshot){
    t1.innerHTML = "Turno: " + snapshot.child(0).child('turn').val() + " | Ventanilla: " + snapshot.child(0).child('ven').val();
    t2.innerHTML = "Turno: " + snapshot.child(1).child('turn').val() + " | Ventanilla: " + snapshot.child(0).child('ven').val();
    t3.innerHTML = "Turno: " + snapshot.child(2).child('turn').val() + " | Ventanilla: " + snapshot.child(0).child('ven').val();
    t4.innerHTML = "Turno: " + snapshot.child(3).child('turn').val() + " | Ventanilla: " + snapshot.child(0).child('ven').val();
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

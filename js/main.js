var t = document.getElementById("turn");
var v = document.getElementById("vent");

var database = firebase.database();
var turno = database.ref("turno");
var desp = database.ref("desp");
var ventanillas = database.ref("ventanillas");
var reg = database.ref("registro");

'=============================================================================='
'|||||||||||||||||||||||||||||       Metodo       |||||||||||||||||||||||||||||'
'=============================================================================='

/*
turno = direccion de firebase
t     = elemento del documento donde va "turnos"
turn  = numero de turno
*/

function genTurn() {
  turno.once('value').then(function(snapshot){
    var t = document.getElementById("turno");
    t.innerHTML = snapshot.child('turn').val()+snapshot.child('desp').val();
    asignaVen(snapshot.child('turn').val(),snapshot.child('desp').val());
  })
}

/*
x = numero de turno
*/

function setTurn(x){
  turno.child('turn').set(x+1);
}



/*
v = elemento ventanillas del documento
min = ventanilla con menor cantidad de
x = turno a guardar
y = desplazamiento de turnos
*/

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

/*
y = ventana (hijo)
z = valor de la ventana
*/

function actualizaVen(y,z) {
  ventanillas.child(y).set(z+1);
}

/*
x = turno
y = ventanilla
*/

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

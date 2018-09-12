var t = document.getElementById("turn");
var v = document.getElementById("vent");

var database = firebase.database();
var turno = database.ref("turno");
var desp = database.ref("desp");
var ventanillas = database.ref("ventanillas");

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
    setTurn(snapshot.child('turn').val());
    t.innerHTML = snapshot.child('turn').val()+snapshot.child('desp').val();
    asignaVen();
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
*/

function asignaVen() {
  ventanillas.once('value').then(function(snapshot){
    var v = document.getElementById("vent");
    var min = 1;
    for(i=1;i<=snapshot.numChildren();i++){
      if(snapshot.child(min).val()>snapshot.child(i).val()){
        min=i;
      }
    }
    console.log(snapshot.child(min).val());
    v.innerHTML = min;
    actualizaVen(min,snapshot.child(min).val());
  })
}

/*
y = ventana (hijo)
z = valor de la ventana
*/

function actualizaVen(y,z) {
  ventanillas.child(y).set(z+1);
}


var myVar = setInterval(function() {
  myTimer();
}, 1000);

function myTimer() {
  var d = new Date();
  document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}

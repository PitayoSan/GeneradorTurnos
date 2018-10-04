/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var desp = database.ref("desp");
var ventanillas = database.ref("ventanillas");
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
  var max = snapshot.child("1").val();
  var maxVen = 1;
  for(var i=2;i<5;i++){
    if(max<snapshot.child(i).val()){
      max = snapshot.child(i).val()
      maxVen=i;
    }
  }
  var infMax=max-1;
  var venPenUlt=maxVen;
  for(var j=2;j<5;j++){
    if(snapshot.child(j).val()==infMax){
      venPenUlt=j;
    }
  }
  document.getElementById("ultT").innerHTML =  "Ultimo turno:    " + (max + snapshot.child("desp").val())%100 + " | Ventanilla: " + maxVen;
  document.getElementById("pultT").innerHTML = "Penultimo turno: " + (infMax + snapshot.child("desp").val())%100 + " | Ventanilla: " + venPenUlt;
})

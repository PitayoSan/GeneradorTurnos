/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var ventanillas = database.ref("ventanillas");


/*==============================================================================
turno = direccion de firebase
t     = elemento del documento donde va "turnos"
turn  = numero de turno

Descripción: Genera un nuevo turno en función del turno actual
==============================================================================*/
function genTurn() {
  turno.once('value').then(function(snapshot){
    setTurn(snapshot.child('turn').val()+1);
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
Descripción:
==============================================================================*/

function asignaVenByID(ven){
  turno.once('value').then(function(snapshot){
      ventanillas.child(ven).set(snapshot.child("turn").val()+snapshot.child("desp").val());
  })
  setLastWin(ven);
}


function setLastWin(ven){
  turno.child("lastVen").set(ven);
}


/*==============================================================================
Descripción: Actualiza el estado de una ventanilla a "false" (ocupado) y es
asignado un turno a ella
==============================================================================*/
function available1(){
  genTurn();
  ventanillas.child(1).set(true);
  asignaVenByID(1);
}
function available2(){
  genTurn();
  ventanillas.child(2).set(true);
  asignaVenByID(2);
}
function available3(){
  genTurn();
  ventanillas.child(3).set(true);
  asignaVenByID(3);
}
function available4(){
  genTurn();
  ventanillas.child(4).set(true);
  asignaVenByID(4);
}

/*    Obtener path's de los childs por separado    */
var database = firebase.database();
var turno = database.ref("turno");
var ventanillas = database.ref("ventanillas");
var ven1 = ventanillas.child("1");
var ven2 = ventanillas.child("2");
var ven3 = ventanillas.child("3");
var ven4 = ventanillas.child("4");


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
  turno.child('turn').set(x%100);
}

/*==============================================================================
Descripción:
==============================================================================*/

function asignaVenByID(ven){
  turno.once('value').then(function(snapshot){
      ventanillas.child(ven).set((snapshot.child("turn").val()+snapshot.child("desp").val())%100);
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
  document.getElementById("0").innerHTML = "Turno: " + snapshot.val() + " | Ventanilla: 1";
})

ven2.on('value', function(snapshot){
  document.getElementById("1").innerHTML = "Turno: " + snapshot.val() + " | Ventanilla: 2";
})

ven3.on('value', function(snapshot){
  document.getElementById("2").innerHTML = "Turno: " + snapshot.val() + " | Ventanilla: 3";
})

ven4.on('value', function(snapshot){
  document.getElementById("3").innerHTML = "Turno: " + snapshot.val() + " | Ventanilla: 4";
})

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
Descripción: Actualiza el estado de una ventanilla a "false" (ocupado) y es
asignado un turno a ella
==============================================================================*/
function available1(){
  genTurn();
  asignaVenByID(1);
}
function available2(){
  genTurn();
  asignaVenByID(2);
}
function available3(){
  genTurn();
  asignaVenByID(3);
}
function available4(){
  genTurn();
  asignaVenByID(4);
}

function updateDesp() {
  turno.child("desp").set(parseInt(document.getElementById("tfDesp").value));
  document.getElementById("tfDesp").value = "";
}

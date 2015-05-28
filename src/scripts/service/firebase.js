// Firebase
// ===========
// Usamos el servicio de Firebase como Backend.

var Firebase = require('Firebase')
  , Actions = require('../actions/actions');

// Inicializar Firebase
var firebase = new Firebase("https://reflux.firebaseio.com/");

// Escuchar acción addTask
// Agrega una tarea a Firebase
Actions.addTask.listen(function( task ) {

  // Almacenar nueva tarea en Firebase
  var task = firebase.push({
    name: task.name,
    task: task.task
  });

  console.log('Task added: ' + task.key() );

});

// Escuchar acción removeTask
// Remueve una tarea de Firebase
Actions.removeTask.listen(function( id ) {

  firebase.child( id ).remove();

});

// Solo por una vez obtener todas las 
// tareas almacenadas en Firebase
firebase.once( 'value', function( snapshot ){

  var items
    , mapTasks
    , tasks;

  // Obtener todos los registros 
  items = snapshot.val();

  // Agregar el id a cada registro, será igual 
  // a la propiedad key del objecto en Firebase
  mapTasks = function ( item, i ) {
    return {
      id: item,
      name: items[item].name,
      task: items[item].task
    };
  };

  tasks = Object.keys( items ).map( mapTasks )

  // Enviar las tareas a la acción fetchTasks 
  // para detonar el evento onFecthTask del Store
  Actions.fetchTasks( tasks );

});

// Escuchar al evento child_added de Firebase
// Aquí se obtienen las tareas agregadas por 
// todos los clientes conectados a Firebase
firebase.on( 'child_added', function( snapshot ) {
  
  // Tarea agregada    
  var task = snapshot.val();
  task.id = snapshot.key();

  // Enviar la tarea agregada a la acción addedTask
  Actions.addedTask( task );

});

// Escuchar al evento child_removed de Firebase
// Obtener el id del objeto eliminado para
// removerlo de nuestro Store y sincronizar la vista
firebase.on( 'child_removed', function( snapshot ) {
      
  var id = snapshot.key();

  // Enviar el id del objeto a remover 
  // a la acción removedTask
  Actions.removedTask( id );

});


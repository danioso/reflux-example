// Actions
// ===========
// Acciones definidas y disponibles en la aplicación

var Reflux = require('reflux');

// Definimos las acciones
var Actions = Reflux.createActions([
  
  // Enviaran datos a Firebase
  'addTask',
  'removeTask',

  // Escucharan eventos de Firebase
  'addedTask', 
  'removedTask',
  
  // Para cargar el estado inicial
  'fetchTasks'

]);

module.exports = Actions
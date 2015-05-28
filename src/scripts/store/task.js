// Store
// ===========
// El TaskStore reacionará dependiendo 
// de nuestras nuestras acciones definidas 
// en el Actions

var React = require('react')
  , Reflux = require('reflux')
  , Actions = require('../actions/actions');

// Definimos nuestro Store
var TaskStore = Reflux.createStore({
  
  // Escuchamos a todas las acciones
  // de nuestro Actions
  listenables: Actions,

  // Estado de nuestro Store
  tasks: [],

  // El evento onAddedTask se ejecuta 
  // cuando se llama a la acción addedTask
  onAddedTask: function( task ) {

    // Agrega la nueva tarea al inicio del arreglo
    this.tasks.unshift( task );

    // Detona los cambios
    this.trigger( this.tasks );
   
  },

  // El evento onRemovedTask se ejecuta 
  // cuando se llama a la acción removedTask
  onRemovedTask: function( id ) {

    // Remueve la tarea
    this.tasks = this.tasks.filter(function(item){
      return item.id !== id;
    });

    // Detona los cambios
    this.trigger( this.tasks );

  },

  // El evento onFetchTasks se ejecuta 
  // cuando se llama a la acción fetchTasks
  onFetchTasks: function( tasks ) {
    console.log('holaaa');
    // Estado inicial
    this.tasks = tasks;

    // Detona los cambios
    this.trigger( this.tasks );
   
  }

});

module.exports = TaskStore

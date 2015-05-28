// Componente Tasks
// ===========
// Componente de React para representar 
// representar una vista que listará tareas

var React = require('react')
  , Reflux = require('reflux')
  , Task = require('./task.jsx')
  , Actions = require('../actions/actions.js')
  , TaskStore = require('../store/task.js');

// Definimos nuestro componente
var Tasks = React.createClass({

  // Conectar el estado de nuestro componente
  // con el TaskStore para reaccionar a cambios
  mixins: [ Reflux.connect(TaskStore,"tasks") ],

  // Estado actual
  getInitialState: function() {
    return {tasks: []};
  },

  // Agregamos un handler para detonar
  // la acción de agregar una nueva tarea
  handleAddTask: function( event ) {
      
      // Prevenir evento por defecto
      event.preventDefault();

      // Obtener los nodos del DOM
      var name = this.refs.name.getDOMNode()
      var task = this.refs.task.getDOMNode()

      // validar que los campos no esten vacios
      if( name.value.trim() != '' &&  task.value.trim() != '' ){
        Actions.addTask({
          name: name.value.trim(),
          task: task.value.trim()
        });

        task.value = '';
      }
  },

  // Nuestro render del HTML
  render: function() {

    // Obtenemos por cada tarea un componente Task
    // que será renderizado en nuestra vista
    var tasks = this.state.tasks.map(function (row) {
      return (
        <Task key={row.id} id={row.id} name={row.name} task={row.task} />
      );
    });

    return (
      <div className="">
        <h1>Tasks <a className="repo" href="https://github.com/danioso/reflux-example">github.com/danioso/reflux-example</a></h1>
        <form onSubmit={ this.handleAddTask }>
          <div className="block">
            <label htmlFor="name">I am</label> 
            <input type="name" maxLength="20" placeholder="..." id="name" ref="name" />
          </div>
          <div className="block">
            <label htmlFor="task">My task</label>
            <input type="task" maxLength="100" placeholder="..." id="task" ref="task" />
          </div>
          <div className="block">
            <button type="submit" className="add" ref="submit">Add</button>
          </div>
        </form>

        <table className="tasks-list">
          {tasks}
        </table>
      </div>
    );
  }
});

module.exports = Tasks

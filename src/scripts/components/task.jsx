// Componente Task
// ===========
// Componente de React para representar 
// una tarea

var React = require('react')
  , Reflux = require('reflux')
  , Actions = require('../actions/actions.js');

// Definimos nuestro componente
var Task = React.createClass({

  // Agregamos un handler para detonar
  // la acción de remover una tarea
  handleRemoveTask: function( event ) {
      Actions.removeTask( this.props.id );
  },

  // Nuestro render del HTML
  render: function() {

    return (
      <tr key={this.props.id} >
        <td>{this.props.name}</td>
        <td>{this.props.task}</td>
        <td>
          <button className="remove" onClick={this.handleRemoveTask}>&times;</button>
        </td>
      </tr>
    );
  }
});

module.exports = Task

var React = require('react')
  , Tasks = require('./components/tasks.jsx')
  , Actions = require('./actions/actions.js');

// Exponer el Actions para usarlo
// en la consola del navegador
// Ej: window.Actions.addTask({name: 'Mike', task: 'Hola mundo!})
global.Actions = Actions;

// Iniciar servicio
require('./service/firebase.js');

// Renderizar aplicación
React.render(<Tasks />, document.getElementById('container') );

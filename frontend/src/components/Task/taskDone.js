import React from 'react';
import PropTypes from 'prop-types';

const TaskDone = (props) => {
  return (
    /* 
        Aqui va ir una tabla con la lista de tareas ya realizadas con un boton para borrar.
        La idea es usar material UI
    */ 
    <table>
               
    </table>
  );
}

TaskDone.propTypes = {
  idTask: PropTypes.string.isRequired,
  listTask: PropTypes.object.isRequired
}

export default TaskDone;
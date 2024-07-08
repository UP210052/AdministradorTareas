import React from 'react';
import PropTypes from 'prop-types';

const taskToDone = (props) => {
  return (
    /* 
        Aqui va ir una tabla con la lista de tareas por realizar con un boton para editar, marcar como completado y borrar.
        La idea es usar material UI
    */ 
    <Table>
               
    </Table>
  );
}

taskToDone.propTypes = {
  idTask: PropTypes.string.isRequired,
  listTask: PropTypes.object.isRequired
}

export default taskToDone;
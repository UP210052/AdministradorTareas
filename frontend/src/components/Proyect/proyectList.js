import React from 'react';
import PropTypes from 'prop-types';

const ProyectList = (props) => {
  return (
    <div>
      {/*Aqui se mostraran los proyectos junto con algunas tareas*/}
    </div>
  );
}

ProyectList.propTypes = {
  listProyects: PropTypes.object.isRequired,
}

export default ProyectList;
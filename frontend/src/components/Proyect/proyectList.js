import React from 'react';
import PropTypes from 'prop-types';

const proyectList = (props) => {
  return (
    <div>
      {/*Aqui se mostraran los proyectos junto con algunas tareas*/}
    </div>
  );
}

proyectList.propTypes = {
  listProyects: PropTypes.object.isRequired,
}

export default proyectList;
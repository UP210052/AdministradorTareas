import React from 'react';
import PropTypes from 'prop-types';

const ProjectList = (props) => {
  return (
    <div>
      {/*Aqui se mostraran los proyectos junto con algunas tareas*/}
    </div>
  );
}

ProjectList.propTypes = {
  listProyects: PropTypes.object.isRequired,
}

export default ProjectList;
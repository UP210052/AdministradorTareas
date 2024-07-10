import React from 'react';
import PropTypes from 'prop-types';

const TaskAlert = (props) => {
  return (
    <div>
      <h3>Alerta</h3>
      <h4>Do you want to mark the task {props.description} ?</h4>
      <button>No</button>
      <button onClick={props.deleteFunction}>
        Yes
      </button>
    </div>
  );
}

TaskAlert.propTypes = {
  description: PropTypes.string.isRequired,
  deleteFunction: PropTypes.any.isRequired
}

export default TaskAlert;
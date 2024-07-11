import React from 'react';
import PropTypes from 'prop-types';

const TaskAlert = (props) => {
  return (
    <div class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Alert</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    /*
    <div>
      <h3>Alerta</h3>
      <h4>Do you want to mark the task {props.description} ?</h4>
      <button>No</button>
      <button onClick={props.deleteFunction}>
        Yes
      </button>
    </div>
    */
  );
}

TaskAlert.propTypes = {
  description: PropTypes.string.isRequired,
  deleteFunction: PropTypes.any.isRequired
}

export default TaskAlert;
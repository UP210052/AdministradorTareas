import React from 'react';
import PropTypes from 'prop-types';

const TaskAlert = ({ description, actionType, confirmFunction, closeFunction }) => {
  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Alert</h5>
                    <button type="button" className="btn-close" onClick={closeFunction} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>{actionType === 'delete' ? `Do you want to delete the task: ${description}?` : `Do you want to mark the task: ${description} as completed?`}</p>
                </div>
                <div className="modal-footer">
                <button type="button" className={`btn ${actionType === 'delete' ? 'btn-danger' : 'btn-success'}`} onClick={confirmFunction} >{actionType === 'delete' ? 'Delete' : 'Complete'}</button>
                    <button type="button" className="btn btn-secondary" onClick={closeFunction}>Close</button>
                </div>
            </div>
        </div>
    </div>
  );
};

TaskAlert.propTypes = {
  description: PropTypes.string.isRequired,
  actionType: PropTypes.oneOf(['delete', 'complete']).isRequired,
  confirmFunction: PropTypes.func.isRequired,
  closeFunction: PropTypes.func.isRequired,
};

export default TaskAlert;
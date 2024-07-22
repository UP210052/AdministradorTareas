import React from 'react';
import TaskToDo from './taskToDo';
import TaskDone from './taskDone';

class TaskView extends React.Component {

    renderSelectedButton = (selectedIdTask, actionDescription) => {
        this.setState({
            idTask: selectedIdTask,
            description: actionDescription,
        });
    }

    render() {
        return (
            <div>
                <TaskToDo/>
                <br />
                <TaskDone/>
            </div>
        );
    }
}


export default TaskView;
// import taskAlert from "./taskAlert";
// import taskDone from "./taskDone";
// import taskForm from "./taskForm";
// import taskToDo from '../Task/taskToDo';

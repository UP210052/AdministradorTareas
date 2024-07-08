import React from 'react';
import taskAlert from "./taskAlert";
import tasksToDo from "./taskToDo";
import taskDone from "./taskDone";
import taskForm from "./taskForm";


class taskView extends React.Component {

    renderSelectedButton = (selectedIdTask, actionDescription) => {
        this.setState({
            idTask: selectedIdTask,
            description: actionDescription,
        });
    }

    render() {
        return (
            <div>
                {/* 
                    Aqui mandamos a llamar los componentes de la vista task de momento, no sé cómo.
                    Pienso que se llaman como etiquta.
                    <taskDone></taskDone>
                */}
                
            </div>
        );
    }
}


export default taskView;
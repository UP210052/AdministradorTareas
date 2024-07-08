import React from 'react';

class taskForm extends React.Component {

    renderSelectedDelete = (nameTask, descripcionTask, startDateTask, endDateTask, assignedTask) => {
        this.setState({
            name: nameTask,
            description : descripcionTask,
            startDate : startDateTask,
            endDate: endDateTask,
            assigned: assignedTask,
        });
    }

    render() {
        return (
            /* 
            Aqui va a ser un form para agregar una tarea o editar una ya seleccionada.
            */ 
            <form>
               
            </form>
        );
    }
}

export default taskForm;
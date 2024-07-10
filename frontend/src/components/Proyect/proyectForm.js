import React from 'react';

class ProyectForm extends React.Component {

    renderSelectedDelete = (nameProyect, descripcionProyect, startDateProyect, endDateProyect, assignedProyect) => {
        this.setState({
            name: nameProyect,
            description : descripcionProyect,
            startDate : startDateProyect,
            endDate: endDateProyect,
            assigned: assignedProyect,
        });
    }

    render() {
        return (
            /* 
            Aqui va a ser un form para agregar un nuevo proyecto.
            */ 
            <form>
               
            </form>
        );
    }
}

export default ProyectForm;
import React from 'react';
import proyectForm from './proyectForm';
import proyectList from './proyectList';

class proyectView extends React.Component {

    renderSelectedButton = (selectedIdProyect, actionDescription) => {
        this.setState({
            idProyect: selectedIdProyect,
            description: actionDescription,
        });
    }

    render() {
        return (
            <div>
                {/* 
                    Aqui mandamos a llamar los componentes de la vista de  proyectos de momento, no sé cómo.
                    Pienso que se llaman como etiquta.
                */}
                
            </div>
        );
    }
}


export default proyectView;
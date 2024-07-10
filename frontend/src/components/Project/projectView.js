import React from 'react';
import ProjectForm from './projectForm';
import ProjectList from './projectList';

class ProjectView extends React.Component {

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


export default ProjectView;
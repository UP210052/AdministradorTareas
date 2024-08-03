import React from 'react';
import { AppBar, Toolbar, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectList from './projectList';
import ProjectForm from './projectForm';
import { projectApiService } from '../../api';



class ProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectsAndTasks: [],
            openDialog: false,
            actionType: 'add', 
            projectData: null 
        };
    }

    async componentDidMount() {
        try {
            const projectsAndTasks = await projectApiService.getProjectsAndTasks();
            this.setState({ projectsAndTasks, isLoading: false });
        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    }

    handleDialogOpen = (actionType, projectData = null) => {
        this.setState({
            openDialog: true,
            actionType: actionType,
            projectData
        });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false, projectData: null });
    };

    handleConfirm = () => {
        this.componentDidMount();
    };

    render() {
        const { projectsAndTasks, openDialog, actionType, projectData } = this.state;

        return (
            <div>
                <br/>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Projects Overview
                        </Typography>
                        <Fab color="primary" aria-label="add" size="small" onClick={() => this.handleDialogOpen('add')}>
                            <AddIcon />
                        </Fab>
                    </Toolbar>
                </AppBar>
                <ProjectList
                    projectsAndTasks={projectsAndTasks}
                    onEdit={(project) => this.handleDialogOpen('edit', project)}
                />
                {openDialog && (
                    <ProjectForm
                        projectData={projectData}
                        actionType={actionType}
                        confirmFunction={this.handleConfirm}
                        closeFunction={this.handleDialogClose}
                    />
                )}
            </div>
        );
    }
}

export default ProjectView;

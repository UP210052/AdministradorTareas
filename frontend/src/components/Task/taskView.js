import React from 'react';
import { Box, Grid } from '@mui/material'; // Asegúrate de tener @mui/material instalado
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
            <Box sx={{ flexGrow: 1, mt: 2 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                            <TaskToDo />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <TaskDone />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default TaskView;

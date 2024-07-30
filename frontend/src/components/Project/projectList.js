import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const columns = [
    { field: 'taskId', headerName: 'ID', width: 10 },
    { field: 'taskName', headerName: 'Name', width: 100 },
    { field: 'startDate', headerName: 'Start date', width: 100 },
    { field: 'endDate', headerName: 'End date', width: 100 },
    { field: 'status', headerName: 'Status', width: 80 },
    { field: 'assignedUsers', headerName: 'Assigned Users', width: 150 },
];

const ProjectList = ({ projectsAndTasks }) => {
    const transformedProjects = projectsAndTasks.map(project => {
        return {
            id: project.projectId,
            name: project.projectName,
            leaderName: project.leaderName,
            rows: project.tasks.map(task => ({
                id: task.taskId,
                taskId: task.taskId,
                taskName: task.taskName,
                startDate: task.startDate,
                endDate: task.endDate,
                status: task.status,
                assignedUsers: task.assignedUsers,
            }))
        };
    });

    return (
        <div>
            <Box sx={{ flexGrow: 1, mt: 2, px: 2 }}> 
                <Grid container spacing={4} columns={{ xs: 4, sm: 8, md: 8 }}>
                    {transformedProjects.map(project => (
                        <Grid xs={2} sm={4} md={4} key={project.id}>
                            <Item sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="h6" component="div" gutterBottom sx={{ textAlign: 'left' }}>
                                        {project.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Leader: {project.leaderName}
                                    </Typography>
                                </Box>
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid rows={project.rows} columns={columns} initialState={{pagination: { paginationModel: { page: 0, pageSize: 5 }, }, }} pageSizeOptions={[5, 10]} />
                                </div>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
};

ProjectList.propTypes = {
    projectsAndTasks: PropTypes.array.isRequired,
};

export default ProjectList;

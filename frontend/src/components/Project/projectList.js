import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';


const columns = [
    { field: 'taskId', headerName: 'ID', width: 50 },
    { field: 'taskName', headerName: 'Name', width: 150 },
    { field: 'startDate', headerName: 'Start date', width:100 },
    { field: 'endDate', headerName: 'End date', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'assignedUsers', headerName: 'Assigned Users', width: 200 },
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
                <Grid container spacing={4}>
                    {transformedProjects.map(project => (
                        <Grid item xs={12} sm={6} md={6} key={project.id}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="h6" component="div" gutterBottom sx={{ textAlign: 'left' }}>
                                    {project.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Leader: {project.leaderName}
                                </Typography>
                            </Box>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={project.rows}
                                    columns={columns}
                                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 }, }, }}
                                    pageSizeOptions={[5, 10]}
                                />
                            </div>
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

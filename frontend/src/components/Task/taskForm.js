import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import { projectApiService, taskApiService, usersApiService } from '../../api';

const TaskForm = ({ taskData, actionType, confirmFunction, closeFunction }) => {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description:'',
        startDate: '',
        endDate: '',
        status: '',
        projectId: '',
        userIds: []
    });
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectApiService.getIdProject();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const data = await usersApiService.getIdUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchProjects();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (actionType === 'edit' && taskData && taskData.id) {
            const fetchTask = async () => {
                try {
                    const data = await taskApiService.getTaskById(taskData.id);
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching task:', error);
                }
            };
            fetchTask();
        } else {
            setFormData({
                id: 0,
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                status: '',
                projectId: '',
                userIds: []
            });
        }
    }, [actionType, taskData]);

    const handleChange = (id) => (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleMultipleChange = (id) => (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value 
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (actionType === 'add') {
                await taskApiService.createTask(formData);
            } else if (actionType === 'edit') {
                await taskApiService.updateTask(formData, formData.id);
            }
            confirmFunction();
            closeFunction();
        } catch (error) {
            console.error('Error saving task:', error);
            alert('Failed to save task');
        }
    };

    return (
        <Modal open={true} onClose={closeFunction} aria-labelledby="task-form-title" aria-describedby="task-form-description">

            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    p: 3,
                    boxShadow: 24,
                    borderRadius: 2,
                    overflowY: 'auto'
                }}
            >
                <h2 id="task-form-title" style={{ fontSize: '1.25rem' }}>
                    {actionType === 'add' ? 'Add New Task' : 'Edit Task'}
                </h2>
                <form id="taskForm" onSubmit={handleSubmit}>
                    <TextField
                        label="Task Name"
                        id="name"
                        fullWidth
                        margin="normal"
                        value={formData.name}
                        onChange={handleChange("name")}
                        InputProps={{ style: { fontSize: '0.875rem' } }}
                    />
                    <TextField
                        label="Description"
                        id="description"
                        multiline
                        rows={3}
                        fullWidth
                        margin="normal"
                        value={formData.description}
                        onChange={handleChange("description")}
                        InputProps={{ style: { fontSize: '0.875rem' } }}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                label="Start Date"
                                id="startDate"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={formData.startDate}
                                onChange={handleChange("startDate")}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ style: { fontSize: '0.875rem' } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="End Date"
                                id="endDate"
                                type="date"
                                fullWidth
                                margin="normal"
                                value={formData.endDate}
                                onChange={handleChange("endDate")}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{ style: { fontSize: '0.875rem' } }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label" style={{ fontSize: '0.875rem' }}>Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange("status")}
                                    style={{ fontSize: '0.875rem' }}
                                >
                                    <MenuItem id="status" value="Pending" style={{ fontSize: '0.875rem' }}>Pending</MenuItem>
                                    <MenuItem id="status" value="Finished" style={{ fontSize: '0.875rem' }}>Finished</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="projectId-label" style={{ fontSize: '0.875rem' }}>Project ID</InputLabel>
                                <Select
                                    labelId="projectId-label"
                                    id="projectId"
                                    style={{ fontSize: '0.875rem' }}
                                    onChange={handleChange("projectId")}
                                    value={formData.projectId}
                                >
                                    {projects.map((project) => (
                                        <MenuItem key={project[0]} value={project[0]} style={{ fontSize: '0.875rem' }}>
                                            {project[1]}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="assign-label" style={{ fontSize: '0.875rem' }}>Assignees</InputLabel>
                        <Select
                            labelId="assign-label"
                            id="userIds"
                            multiple
                            style={{ fontSize: '0.875rem' }}
                            value={formData.userIds}
                            onChange={handleMultipleChange("userIds")}
                            defaultValue={[]} 
                        >
                            {users.map((user) => (
                                <MenuItem key={user[0]} value={user[0]} style={{ fontSize: '0.875rem' }}>
                                    {user[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Button type="submit" variant="contained" color="success" style={{ marginRight: 10 }}>
                            Save Task
                        </Button>
                        <Button variant="contained" color="error" onClick={closeFunction}>
                            Close
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

TaskForm.propTypes = {
    taskData: PropTypes.object,
    actionType: PropTypes.string.isRequired,
    closeFunction: PropTypes.func.isRequired
};

export default TaskForm;

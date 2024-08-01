import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';
import { projectApiService, usersApiService } from '../../api';

const ProjectForm = ({ projectData, actionType, confirmFunction, closeFunction }) => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        userLeaderId: '',
        userIds: []
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await usersApiService.getIdUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (actionType === 'edit' && projectData && projectData.id) {
            const fetchProject = async () => {
                try {
                    const data = await projectApiService.getProjectById(projectData.id);
                    setFormData(data);
                } catch (error) {
                    console.error('Error fetching project:', error);
                }
            };
            fetchProject();
        } else {
            setFormData({
                id: 0,
                name: '',
                description: '',
                startDate: '',
                endDate: '',
                userLeaderId: '',
                userIds: []
            });
        }
    }, [actionType, projectData]);

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
            await projectApiService.createProject(formData);
            confirmFunction();
            closeFunction();
            /*
            if (actionType === "add") {
                await projectApiService.createProject(formData);
            } else if (actionType === 'edit') {
                await projectApiService.updateProject(formData, formData.id);
            }
            confirmFunction();
            closeFunction();
            */
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    return (
        <Modal open={true} onClose={closeFunction} aria-labelledby="project-form-title" aria-describedby="project-form-description">
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
                <h2 id="project-form-title" style={{ fontSize: '1.25rem' }}>
                    {actionType === 'add' ? 'Add New Project' : 'Edit Project'}
                </h2>
                <form id="projectForm" onSubmit={handleSubmit}>
                    <TextField
                        label="Project Name"
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="leaderId-label" style={{ fontSize: '0.875rem' }}>Leader</InputLabel>
                        <Select
                            labelId="leaderId-label"
                            id="userLeaderId"
                            value={formData.leaderId}
                            onChange={handleChange("userLeaderId")}
                            style={{ fontSize: '0.875rem' }}
                        >
                            {users.map((user) => (
                                <MenuItem key={user[0]} value={user[0]} style={{ fontSize: '0.875rem' }}>
                                    {user[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            Save Project
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

ProjectForm.propTypes = {
    projectData: PropTypes.object,
    actionType: PropTypes.string.isRequired,
    confirmFunction: PropTypes.func.isRequired,
    closeFunction: PropTypes.func.isRequired
};

export default ProjectForm;

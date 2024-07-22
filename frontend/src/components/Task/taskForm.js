import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';

const TaskForm = ({ description, actionType, closeFunction }) => {
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
                <form id="taskForm">
                    <TextField
                        label="Task Name"
                        id="taskName"
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { fontSize: '0.875rem' } }}
                    />
                    <TextField
                        label="Description"
                        id="description"
                        multiline
                        rows={3}
                        fullWidth
                        margin="normal"
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
                                    style={{ fontSize: '0.875rem' }}
                                >
                                    <MenuItem value="Pending" style={{ fontSize: '0.875rem' }}>Pending</MenuItem>
                                    <MenuItem value="Finished" style={{ fontSize: '0.875rem' }}>Finished</MenuItem>
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
                                >
                                    <MenuItem value="1" style={{ fontSize: '0.875rem' }}>Project 1</MenuItem>
                                    <MenuItem value="2" style={{ fontSize: '0.875rem' }}>Project 2</MenuItem>
                                    <MenuItem value="3" style={{ fontSize: '0.875rem' }}>Project 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="assign-label" style={{ fontSize: '0.875rem' }}>Assignees</InputLabel>
                        <Select
                            labelId="assign-label"
                            id="assign"
                            multiple
                            style={{ fontSize: '0.875rem' }}
                            defaultValue={[]} 
                        >
                            <MenuItem value="user1" style={{ fontSize: '0.875rem' }}>User 1</MenuItem>
                            <MenuItem value="user2" style={{ fontSize: '0.875rem' }}>User 2</MenuItem>
                            <MenuItem value="user3" style={{ fontSize: '0.875rem' }}>User 3</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ mt: 2, textAlign: 'right' }}>
                        <Button variant="contained" color="success" style={{ marginRight: 10 }}>
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
    description: PropTypes.string,
    actionType: PropTypes.string.isRequired,
    closeFunction: PropTypes.func.isRequired
};

export default TaskForm;

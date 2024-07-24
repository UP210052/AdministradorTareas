import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TaskForm from './taskForm';
import TaskAlert from './taskAlert';
import { AppBar, Toolbar, Typography, Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTaskContext } from '../../context/TaskContext';
import { taskApiService } from '../../api';


const TaskToDo = () => {
    const { tasksToDo, updateTask } = useTaskContext();
    // const [tasks, setTasks] = useState([]);
    const [openModal, setOpenModal] = useState({ form: false, alert: false });
    const [selectedTask, setSelectedTask] = useState(null);
    const [actionType, setActionType] = useState('');
    
    const handleAction = (type, task) => {
        setSelectedTask(task);
        setActionType(type);
        if (type === 'add' || type === 'edit') {
            setOpenModal({ form: true, alert: false });
        } else {
            setOpenModal({ form: false, alert: true });
        }
    };

    const handleConfirmAction = async () => {
        try {
            if (actionType === 'delete') {
                await taskApiService.deleteTask(selectedTask.id);
            } else if (actionType === 'complete') {
                await taskApiService.completeTask(selectedTask.id); 
            }
            updateTask();
        } catch (error) {
            console.error(`Error performing ${actionType} action:`, error);
        }
        setOpenModal({ form: false, alert: false });
        setSelectedTask(null);
    };

    const handleCloseModal = () => {
        setOpenModal({ form: false, alert: false });
        setSelectedTask(null);
    };

    const handleOpenForm = () => { 
        setSelectedTask(null);
        setActionType('add');
        setOpenModal({ form: true, alert: false });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'taskName', headerName: 'Task name', width: 130 },
        { field: 'description', headerName: 'Description', width: 220 },
        { field: 'startDate', headerName: 'Start date', width: 100 },
        { field: 'endDate', headerName: 'End date', width: 100 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'project', headerName: 'Project name', width: 180 },
        { field: 'assign', headerName: 'Asing', width: 180 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 270,
            renderCell: (params) => (
                <div>
                    <Button variant="contained" color="primary" size="small" style={{ marginRight: 10 }} onClick={() => handleAction('edit', params.row)}>
                        Edit
                    </Button>
                    <Button variant="contained" color="success" size="small" style={{ marginRight: 10 }}  onClick={() => handleAction('complete', params.row)} >
                        Complete
                    </Button>
                    <Button variant="contained" color="error" size="small" onClick={() => handleAction('delete', params.row)} >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];
    
    return (
        <div>
            <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task To Do
                        </Typography>
                        <Fab color="secondary" aria-label="add" size="small" onClick={handleOpenForm}> 
                        <AddIcon />
                        </Fab>
                    </Toolbar>
            </AppBar>
            <div style={{ height: 290, width: '100%' }}>
                <DataGrid
                rows={tasksToDo}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                />
                 {openModal.alert && (
                    <TaskAlert
                        description={selectedTask?.description || ''}
                        actionType={actionType}
                        confirmFunction={handleConfirmAction}
                        closeFunction={handleCloseModal}
                    />
                )}
                {openModal.form && (
                    <TaskForm
                        actionType={actionType}
                        confirmFunction={updateTask}
                        closeFunction={handleCloseModal}
                        taskData={selectedTask} 
                    />
                )}
            </div>
        </div>
    );
}

export default TaskToDo;
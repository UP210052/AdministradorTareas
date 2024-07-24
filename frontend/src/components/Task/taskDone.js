import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { taskApiService } from '../../api';
import TaskAlert from './taskAlert';  // Asegúrate de importar TaskAlert
import { AppBar, Toolbar, Typography, Button } from '@mui/material';


const TaskDone = () => {
    const [tasks, setTasks] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await taskApiService.getTasksDone();
                const formattedData = data.map((task) => ({
                    id: task[0],
                    taskName: task[1],
                    description: task[2],
                    startDate: task[3],
                    endDate: task[4],
                    status: task[5],
                    project: task[6],
                    assign: task[7],
                }));
                setTasks(formattedData);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleAction = (type, task) => {
        setSelectedTask(task);
        if (type === 'delete') {
            setOpenAlert(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedTask) {
            try {
                await taskApiService.deleteTask(selectedTask.id);
                setTasks(tasks.filter(task => task.id !== selectedTask.id));
            } catch (error) {
                console.error("Error deleting task:", error);
            }
            setOpenAlert(false);
            setSelectedTask(null);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
        setSelectedTask(null);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'taskName', headerName: 'Task name', width: 130 },
        { field: 'description', headerName: 'Description', width: 220 },
        { field: 'startDate', headerName: 'Start date', width: 100 },
        { field: 'endDate', headerName: 'End date', width: 100 },
        { field: 'status', headerName: 'Status', width: 80 },
        { field: 'project', headerName: 'Project name', width: 180 },
        { field: 'assign', headerName: 'Assign', width: 180 },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleAction('delete', params.row)}
                    >
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
                        Task Done
                    </Typography>
                </Toolbar>
            </AppBar>
            <div style={{ height: 290, width: "100%" }}>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            {openAlert && (
                <TaskAlert
                    description={selectedTask?.description || ''}
                    actionType="delete"
                    confirmFunction={handleConfirmDelete}
                    closeFunction={handleCloseAlert}
                />
            )}
        </div>
    );
};

TaskDone.propTypes = {
    idTask: PropTypes.string,
    listTask: PropTypes.object,
};

export default TaskDone;

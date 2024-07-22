import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { taskApiService } from '../../api';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
        field: "actions",
        headerName: "Actions",
        width: 100,
        renderCell: (params) => (
            <div>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => buttonDelete(params.id)}
                >
                    Delete
                </Button>
            </div>
        ),
    },
];

const buttonDelete = (id) => {
    alert(`Delete task with ID: ${id}`);
};

const TaskDone = (props) => {
    const [tasks, setTasks] = useState([]);
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
        </div>
    );
};

TaskDone.propTypes = {
    idTask: PropTypes.string,
    listTask: PropTypes.object,
};

export default TaskDone;

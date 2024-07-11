import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'taskName', headerName: 'Task name', width: 130 },
    { field: 'description', headerName: 'Description', width: 180 },
    { field: 'startDate', headerName: 'Start date', width: 130 },
    { field: 'endDate', headerName: 'End date', width: 130 },
    { field: 'assign', headerName: 'Asing', width: 130 },
    { field: 'project', headerName: 'Project', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        renderCell: (params) => (
            <div>
                <Button variant="contained" color="error" size="small" onClick={() => buttonDelete(params.id)} >
                    Delete
                </Button>
            </div>
        ),
    },
];

const rows = [
    {
        id: 1, taskName: 'Setup Environment', description: 'Setup development environment for the project', 
        startDate: '2024-07-01', endDate: '2024-07-03', assign: 'Alice', project: 'Project Alpha',
    },
    {
        id: 2, taskName: 'Design UI', description: 'Design user interface for the application', 
        startDate: '2024-07-04', endDate: '2024-07-10', assign: 'Bob', project: 'Project Beta',
    },
];

const buttonDelete = (id) => {
    alert(`Delete task with ID: ${id}`);
};


const TaskDone = (props) => {
  return (
    <div style={{ height: 290, width: '100%' }}>
        <br/>
        <br/>
        <br/>
        <h2>Tasks done</h2>
        <button>+</button>
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    </div>
  );
}

TaskDone.propTypes = {
  idTask: PropTypes.string.isRequired,
  listTask: PropTypes.object.isRequired
}

export default TaskDone;
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AppBar, Toolbar, Typography, Fab } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'status', headerName: 'Status', width: 80 },
    { field: 'userIds', headerName: 'User', width: 150 },
];

class ProjectView extends React.Component {
    state = {
        projects: [
            { id: 1, name: 'Proyecto 1', rows: [{ id: 1, name: 'Snow', age: 35 }, { id: 2, name: 'Lannister', age: 42 }] },
            { id: 2, name: 'Proyecto 2', rows: [{ id: 3, name: 'Stark', age: 45 }, { id: 4, name: 'Targaryen', age: 16 }] },
            { id: 3, name: 'Proyecto 3', rows: [{ id: 5, name: 'Melisandre', age: 150 }, { id: 6, name: 'Clifford', age: 44 }] },
            // Añadir más proyectos con sus propias filas aquí
        ],
    };

    renderSelectedButton = (selectedIdProyect, actionDescription) => {
        this.setState({
            idProyect: selectedIdProyect,
            description: actionDescription,
        });
    };

    render() {
        const { projects } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            New Project
                        </Typography>
                        <Fab color="secondary" aria-label="add" size="small">
                            <AddIcon />
                        </Fab>
                    </Toolbar>
                </AppBar>

                <Box sx={{ flexGrow: 1, mt: 2 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
                        {projects.map((project) => (
                            <Grid xs={2} sm={4} md={4} key={project.id}>
                                <Item>
                                    <Typography variant="h6" component="div" gutterBottom sx={{ textAlign: 'left' }}>
                                        {project.name}
                                    </Typography>
                                    <div style={{ height: 300, width: '100%' }}>
                                        <DataGrid rows={project.rows} columns={columns} pageSize={5} />
                                    </div>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default ProjectView;

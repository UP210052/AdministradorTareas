import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { AppBar, Toolbar, Typography, Fab, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'age', headerName: 'Description', width: 130 },
    { field: 'age', headerName: 'Age', width: 130 },
];

class ProjectView extends React.Component {
    state = {
        projects: [
            { id: 1, name: 'Proyecto 1', rows: [{ id: 1, name: 'Snow', age: 35 }, { id: 2, name: 'Lannister', age: 42 }] },
            { id: 2, name: 'Proyecto 2', rows: [{ id: 3, name: 'Stark', age: 45 }, { id: 4, name: 'Targaryen', age: 16 }] },
            { id: 3, name: 'Proyecto 3', rows: [{ id: 5, name: 'Melisandre', age: 150 }, { id: 6, name: 'Clifford', age: 44 }] },

        ],
        openDialog: false,
        newProject: {
            name: '',
            description: '',
            start_date: '',
            end_date: ''
        }
    };

    handleDialogOpen = () => {
        this.setState({ openDialog: true });
    };

    handleDialogClose = () => {
        this.setState({ openDialog: false, newProject: { name: '', description: '', start_date: '', end_date: '' } });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            newProject: {
                ...prevState.newProject,
                [name]: value
            }
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // agregar lógica para guardar el nuevo proyecto en la base de datos
        console.log(this.state.newProject);
        this.handleDialogClose();
    };

    renderSelectedButton = (selectedIdProyect, actionDescription) => {
        this.setState({
            idProyect: selectedIdProyect,
            description: actionDescription,
        });
    };

    render() {
        const { projects, openDialog, newProject } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            New Project
                        </Typography>
                        <Fab color="secondary" aria-label="add" size="small" onClick={this.handleDialogOpen}>
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

                <Dialog open={openDialog} onClose={this.handleDialogClose}>
                    <DialogTitle>Agregar Nuevo Proyecto</DialogTitle>
                    <DialogContent>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}
                            onSubmit={this.handleSubmit}
                        >
                            <TextField
                                label="Nombre del Proyecto"
                                name="name"
                                value={newProject.name}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Descripción"
                                name="description"
                                value={newProject.description}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                label="Fecha de Entrada"
                                name="start_date"
                                type="date"
                                value={newProject.start_date}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                            <TextField
                                label="Fecha de Finalización"
                                name="end_date"
                                type="date"
                                value={newProject.end_date}
                                onChange={this.handleInputChange}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogClose}>Cancelar</Button>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">Agregar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ProjectView;

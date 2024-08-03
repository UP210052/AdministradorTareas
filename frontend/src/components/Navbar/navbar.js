import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, CssBaseline, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Assignment';
import ProjectIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';

const drawerWidth = 200;

const menuItems = [
    {
        id: 1,
        name: 'Home',
        path: '/task',
        icon: <HomeIcon />,
    },
    {
        id: 2,
        name: 'Task',
        path: '/task',
        icon: <TaskIcon />,
    },
    {
        id: 3,
        name: 'Project',
        path: '/project',
        icon: <ProjectIcon />,
    },
    {
        id: 4,
        name: 'Login',
        path: '/login',
        icon: <LoginIcon />,
    }
];

const Navbar = ({ drawerOpen, onDrawerToggle }) => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Task Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={drawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <List>
                    {isLoggedIn && (
                        <>
                            <ListItem button key={menuItems[0].id} component={Link} to={menuItems[0].path}>
                                <ListItemIcon>{menuItems[0].icon}</ListItemIcon>
                                <ListItemText primary={menuItems[0].name} />
                            </ListItem>
                            <ListItem button key={menuItems[1].id} component={Link} to={menuItems[1].path}>
                                <ListItemIcon>{menuItems[1].icon}</ListItemIcon>
                                <ListItemText primary={menuItems[1].name} />
                            </ListItem>
                            <ListItem button key={menuItems[2].id} component={Link} to={menuItems[2].path}>
                                <ListItemIcon>{menuItems[2].icon}</ListItemIcon>
                                <ListItemText primary={menuItems[2].name} />
                            </ListItem>
                        </>

                    )}
                    <ListItem button key={menuItems[3].id} component={Link} to={menuItems[3].path}>
                        <ListItemIcon>{menuItems[3].icon}</ListItemIcon>
                        <ListItemText primary={menuItems[3].name} />
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default Navbar;

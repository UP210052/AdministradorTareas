import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import HomeIcon from '@mui/icons-material/Home';
import TaskIcon from '@mui/icons-material/Assignment';
import ProjectIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';

const menuItems = [
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

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            component={Link}
            to={item.path}
            startIcon={item.icon}
            sx={{
              color: 'white',
              mx: 1.5,
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#5c6bc0',
                transform: 'scale(1.05)',
                transition: 'transform 0.2s ease-in-out',
              },
              '&:active': {
                transform: 'scale(0.95)',
                transition: 'transform 0.1s ease-in-out',
              },
            }}
          >
            {item.name}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

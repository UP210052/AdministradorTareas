import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const menuItems = [
  {
    id: 1,
    name: 'Task',
    path: '/task',
  },
  {
    id: 2,
    name: 'Project',
    path: '/project',
  },
  {
    id: 3,
    name: 'Login',
    path: '/login',
  },
];

class Navbar extends React.Component {
  renderMenuItems = (selectedItem) => {
    this.setState({
      actualPage: selectedItem
    });
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          {menuItems.map(item => (
            <Button
              key={item.id}
              color="inherit"
              component={Link}
              to={item.path}
              onClick={() => this.renderMenuItems(item.name)}
            >
              {item.name}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;

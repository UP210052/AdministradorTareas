import React from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    id: 1,
    name: 'Task',
    path: '/task',
    position: null,
  },
  {
    id: 2,
    name: 'Proyect',
    path: '/project',
    position: null,
  },
  {
    id: 3,
    name: 'Login',
    path: '/login',
    position: 'right',
  }
];

class Navbar extends React.Component {
  renderMenuItems = (selectedItem) => {
    this.setState({
      actualPage: selectedItem
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {menuItems.map(item => (
              <li className="nav-item" key={item.id}>
                <Link className="nav-link" to={item.path} onClick={() => this.renderMenuItems(item.name)}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

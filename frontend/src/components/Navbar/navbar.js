import React from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Task',
    position: null,
  },
  {
    id: 2,
    name: 'Proyect',
    position: null,
  },
  {
    id: 3,
    name: 'Login',
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
      <navbar>
        <li>
          {menuItems.map(item => (
            <ul key={item.id}
              onClick={() => this.renderMenuItems(item.name)}>
              {item.name}
            </ul>
          ))}
        </li>
      </navbar>
    );
  }
}

export default Navbar;
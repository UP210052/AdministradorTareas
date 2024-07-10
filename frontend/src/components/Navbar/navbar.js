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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {menuItems.map(item => (
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="page" href={item.name} key={item.id} onClick={() => this.renderMenuItems(item.name)}>
                            {item.name}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
  }
}

export default Navbar;
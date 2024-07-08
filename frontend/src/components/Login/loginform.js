import React from 'react';

class loginForm extends React.Component {

    renderMenuItems = (email, name, password) => {
      this.setState({
        email: email,
        userName: name,
        password:  password,
      });
    }
    render () {
        return (
            <form>
                Formulario para crear nuevo perfil.
            </form>
        );
    }
}
export default loginForm;
import React from 'react';
import loginform from './loginform';

class login extends React.Component {

    renderMenuItems = (email, password) => {
      this.setState({
        email: email,
        password:  password,
      });
    }
    render () {
        return (
            <form>
                Formulario para iniciar sesión.
                
            </form>
            /*
              <loginform></loginform>
            */
        );
    }
    
}
export default login;
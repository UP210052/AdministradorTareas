import React from 'react';
import Navbar from '../Navbar';
import TaskView from '../Task';
import Login from '../Login';
import LoginForm from '../Login/loginform';

function App() {
  return (
    <div className="App">
      <Navbar/>
      {/*<TaskView />*/}
      <LoginForm/>
      <Login />
      

    </div>
  );
}

export default App;

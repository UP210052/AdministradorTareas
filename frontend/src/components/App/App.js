import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import TaskView from '../Task';
import ProjectView from '../Project';
import Login from '../Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Task" element={<TaskView />} />
        <Route path="/Project" element={<ProjectView />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

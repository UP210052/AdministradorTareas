import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar';
import TaskView from '../Task';
import ProjectView from '../Project';
import Login from '../Login';
import NotFound from './NotFound';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Task" element={<TaskView />} />
          <Route path="/Project" element={<ProjectView />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

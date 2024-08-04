import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../Navbar';
import TaskView from '../Task';
import ProjectView from '../Project';
import Login from '../Login';
import NotFound from './NotFound';
import Box from '@mui/material/Box'; 
import Toolbar from '@mui/material/Toolbar'; 

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar drawerOpen={drawerOpen} onDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            margin: 0,
            padding: 0,
            transition: 'margin 0.3s ease',
            marginLeft: drawerOpen ? `${200}px` : '0px',
          }}
        >
          <Toolbar />
          <Routes>
            <Route path="/task" element={<TaskView />} />
            <Route path="/project" element={<ProjectView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

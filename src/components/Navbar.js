import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#1E1E1E', // Slightly lighter dark gray
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#E0E0E0' }}>
          Portfolio Tracker
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard" sx={{ color: '#E0E0E0' }}>
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/stockForm" sx={{ color: '#E0E0E0' }}>
          Add Stock
        </Button>
        <Button color="inherit" component={Link} to="/stockTable" sx={{ color: '#E0E0E0' }}>
          Stocks Table
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

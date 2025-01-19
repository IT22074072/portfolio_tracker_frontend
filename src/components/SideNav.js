import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TableViewIcon from '@mui/icons-material/TableView';

const SideNav = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          backgroundColor: '#121212', // Dark background for the drawer
          color: '#E0E0E0', // Light text for non-selected items
          boxSizing: 'border-box',
          marginTop: '64px',
        },
      }}
    >
      <List>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          selected={location.pathname === '/dashboard'}
          sx={{
            '&.Mui-selected': { backgroundColor: '#000000', color: '#FFFFFF' }, // Black background and white text for selected
            '&:hover': { backgroundColor: '#1F2937' }, // Darker gray hover
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/stockForm"
          selected={location.pathname === '/stockForm'}
          sx={{
            '&.Mui-selected': { backgroundColor: '#000000', color: '#FFFFFF' }, // Black background and white text for selected
            '&:hover': { backgroundColor: '#1F2937' },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Stock" sx={{ color: 'inherit' }} />
        </ListItem>

        <ListItem
          button
          component={Link}
          to="/stockTable"
          selected={location.pathname === '/stockTable'}
          sx={{
            '&.Mui-selected': { backgroundColor: '#000000', color: '#FFFFFF' }, // Black background and white text for selected
            '&:hover': { backgroundColor: '#1F2937' },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <TableViewIcon />
          </ListItemIcon>
          <ListItemText primary="Stocks Table" sx={{ color: 'inherit' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link'

const drawerWidth = 240;
const navItemsAuth = [
  {
    name: 'Home',
    route: '/'
  }, 
  {
    name: 'Jobs',
    route: '/jobs'
  },
  {
    name: 'Connect',
    route: '/connect'
  },
  {
    name: 'Sign Out',
    route: '/auth/signout'
  }
];
const navItemsNoAuth = [
  {
    name: 'Home',
    route: '/'
  }, 
  {
    name: 'Log In',
    route: '/auth/login'
  }
];

function Layout(props) {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState(navItemsAuth)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('htnLoggedIn', 'false')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('htnLoggedIn');
      if (isLoggedIn === 'true') {
        setLoggedIn(true);
        setNavItems(navItemsAuth)
      } else {
        setNavItems(navItemsNoAuth)
      }

      console.log(loggedIn)
    }
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WINterview
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.route}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', backgroundColor:  'primary.sub'}}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            WINterview
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
            <Link key={item.name} href={item.route}>
              <Button sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container component="main" sx={{ p: 3 }}>
        <Toolbar />
        <main>
          {children}
        </main>
      </Container>
    </Box>
  );
}

export default Layout;

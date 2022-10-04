import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router';
import { mainRoutingConstants } from '../../routing/constants';

interface IHeader {
  title: string;
}

export const Header: React.FC<IHeader> = ({ title }) => {
  const history = useHistory();

  const toHome = () => {
    history.push(mainRoutingConstants.home());
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            onClick={toHome}
            variant="h6"
            sx={{ cursor: 'pointer', display: 'inline', padding: '10px' }}
          >
            {title}
          </Typography>
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

import * as React from 'react';
import { Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';

function UiBar(props) {

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, pl: 4 }}>
          <Toolbar variant="dense" sx={{ justifyContent: 'center', gap: 8 }}>

            <IconButton onClick={props.callbacks.handleResetView} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <RestartAltIcon />
            </IconButton>

            <IconButton onClick={props.callbacks.handlePreviousView} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>

            <IconButton onClick={props.callbacks.handleNextView} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <ArrowForwardIcon />
            </IconButton>

            <IconButton onClick={props.callbacks.handleOpenMenu} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>

          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  )
}

export default UiBar;

import * as React from 'react';
import { Fragment, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import UiText from './ui-text';
import UiSwitch from './ui-switch';
import UiSlider from './ui-slider';

function UiDrawer(props) {

  function createUiText(element) {
    return <UiText key={element.id} data={element}/>
  }

  function createUiSwitch(element) {
    return <UiSwitch key={element.id} data={element} callback={props.callbacks.handleSwitchChanged}/>
  }

  function createUiSlider(element) {
    return <UiSlider key={element.id} data={element} callback={props.callbacks.handleSliderchanged}/>
  }

  return (
    <Fragment>

      <Drawer
        PaperProps={{ style: { height: `250px` } }}
        anchor="bottom"
        open={props.handleMenu}
        onClose={props.callbacks.handleCloseMenu}>
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar variant="regular" sx={{ justifyContent: 'center' }}>
            <IconButton onClick={props.callbacks.handlePreviousView} edge="start" color="inherit" aria-label="menu">
              <ArrowBackIcon />
            </IconButton>
            <Button onClick={props.callbacks.handleCloseMenu} variant="contained" sx={{ ml: 1 }}> Close </Button>
            <IconButton onClick={props.callbacks.handleNextView} edge="start" color="inherit" aria-label="menu" sx={{ ml: 1 }}>
              <ArrowForwardIcon />
            </IconButton>
          </Toolbar>
        </Box>
          {Object.values(props.view.elements).map((element)=> {
            if (element.type == 'ui-text') {
              return createUiText(element);
            } else if (element.type == 'ui-switch') {
              return createUiSwitch(element);
            } else if (element.type == 'ui-slider') {
              return createUiSlider(element);
            }
          })}
      </Drawer>
    </Fragment>
  )
}

export default UiDrawer;

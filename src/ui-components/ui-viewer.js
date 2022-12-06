import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { parseView } from '../parser/parser';

import UiDrawer from './ui-drawer';
import UiBar from './ui-bar';

function UiViewer(props) {

  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [currentView, setCurrentView] = useState(parseView(props.data.scaleSlider, props.data.rotateSlider, props.data.children[0]));

  useEffect(() => {
    setCurrentView(parseView(props.data.scaleSlider, props.data.rotateSlider, props.data.children[currentViewIndex]))
  }, [currentViewIndex])

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(currentView);

  const callbacks = {
    handleOpenMenu: handleOpenMenu,
    handleCloseMenu: handleCloseMenu,
    handleResetView: handleResetView,
    handlePreviousView: handlePreviousView,
    handleNextView: handleNextView,
    handleSwitchChanged: handleSwitchChanged,
    handleSliderchanged: handleSliderchanged
  }

  function handleOpenMenu() {
    setView(currentView);
    setOpen(true);
  }

  function handleCloseMenu() {
    setOpen(false);
  }

  function handleResetView() {
    setCurrentView(parseView(props.data.scaleSlider, props.data.rotateSlider, props.data.children[currentViewIndex]));
    const arViewer = document.getElementById('ar-viewer').components['ar-viewer'];
    arViewer.reset();
  }

  function handlePreviousView() {
    if (currentViewIndex > 0) {
      setCurrentViewIndex(currentViewIndex - 1);
    } else {
      setCurrentViewIndex(props.data.children.length - 1);
    }

    const arViewer = document.getElementById('ar-viewer').components['ar-viewer'];
    arViewer.previous();
  }

  function handleNextView() {
    if (currentViewIndex < props.data.children.length - 1) {
      setCurrentViewIndex(currentViewIndex + 1);
    } else {
      setCurrentViewIndex(0);
    }

    const arViewer = document.getElementById('ar-viewer').components['ar-viewer'];
    arViewer.next();
  }

  function handleSwitchChanged(id, action, target, value) {
    currentView.elements[id].currentValue = value;
    setCurrentView(currentView);

    const el = document.getElementById(target);
    if (action == 'visible') {
      if (value) {
        el.components['ar-container'].show();
      } else {
        el.components['ar-container'].hide();
      }
    }
  }

  function handleSliderchanged(id, action, target, value) {
    currentView.elements[id].currentValue = value;
    setCurrentView(currentView);

    const el = document.getElementById(target);
    if (action == 'scale') {
      el.components['ar-view'].scale(value);
    } else if (action == 'rotate') {
      el.components['ar-view'].rotate(value);
    }
  }

  return (
    <Fragment>
      <UiBar callbacks={callbacks} />
      <UiDrawer handleMenu={open} callbacks={callbacks} scaleSlider={props.data.scaleSlider} rotateSlider={props.data.rotateSlider} view={currentView}/>
    </Fragment>
  )
}

export default UiViewer;

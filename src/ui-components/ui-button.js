import * as React from 'react';
import { Fragment } from 'react';
import Button from '@mui/material/Button';


function UiButton(props) {
  return (
    <Fragment>
      <Button variant={props.data.variant}>{props.data.label}</Button>
    </Fragment>
  )
}

export default UiButton;
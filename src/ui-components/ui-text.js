import * as React from 'react';
import { Fragment } from 'react';
import { Typography } from '@mui/material';

function UiText(props) {
  return (
    <Fragment>
      <Typography sx={{ mx: 2 }}variant={props.data.variant}>{props.data.text}</Typography>
    </Fragment>
  )
}

export default UiText;

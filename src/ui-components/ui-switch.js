import * as React from 'react';
import { Fragment, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

function UiSwitch(props) {

  const [value, setValue] = useState(props.data.currentValue);

  function handleChange(event) {
    setValue(event.target.checked);
    props.callback(props.data.id, props.data.action, props.data.target, event.target.checked);
  }

  function capitalizeWords(string) {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  return (
    <Fragment>
      <FormControlLabel control={<Switch sx={{ ml: 2 }} onChange={handleChange} checked={value} size="large" />} label={capitalizeWords(props.data.label)} />
    </Fragment>
  )
}

export default UiSwitch;

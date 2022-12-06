import * as React from 'react';
import { Fragment, useState } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

function UiSlider(props) {

  const [value, setValue] = useState(props.data.currentValue);

  function handleChange(event) {
    setValue(event.target.value);
    props.callback(props.data.id, props.data.action, props.data.target, event.target.value);
  }

  return (
    <Fragment>
      <Typography sx={{ ml: 2, mt: 2 }}>{props.data.label}</Typography>
	    <Stack alignItems="center" sx={{ ml: 2, mr: 2 }}>
	      <Slider sx={{ width: "100%" }} onChange={handleChange} step={0.01} min={props.data.min} max={props.data.max} value={value} valueLabelDisplay="auto" />
    	</Stack>
    </Fragment>
  )
}

export default UiSlider;

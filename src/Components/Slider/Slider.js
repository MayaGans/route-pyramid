import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({
  defaultN,
  step,
  min,
  max,
  clickEvt,
  lab,
}) {
  return (
    <Box sx={{ minWidth: 300, marginLeft: 1 }}>
      <InputLabel label={lab} id="demo-multiple-chip-label">
        {lab}
      </InputLabel>
      <Slider
        aria-label="Temperature"
        defaultValue={defaultN}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={step}
        marks
        min={min}
        max={max}
        onChange={clickEvt}
      />
    </Box>
  );
}

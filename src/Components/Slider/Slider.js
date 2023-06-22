import * as React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider({ defaultN, step, min, max, clickEvt }) {
  return (
    <Box sx={{ minWidth: 300, marginLeft: 1 }}>
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

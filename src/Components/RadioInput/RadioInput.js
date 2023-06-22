import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";

export default function RadioInput({ items, lab, clickEvt, checked }) {
  return (
    <Box sx={{ minWidth: 300, marginLeft: 1 }}>
      <FormControl>
        <FormLabel id={lab}>{lab}</FormLabel>
        <RadioGroup
          aria-labelledby={lab}
          defaultValue={checked}
          name="radio-buttons-group"
          onChange={clickEvt}
        >
          {items.map((value) => {
            return (
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={value}
                key={value}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

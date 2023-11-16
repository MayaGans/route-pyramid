import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ handleChange, lab, val, items }) {
  return (
    <Box sx={{ minWidth: "100%", margin: 1 }}>
      <FormControl fullWidth>
        <InputLabel id={lab}>{lab}</InputLabel>
        <Select
          labelId={lab}
          id={`${lab}_label`}
          defaultValue={val}
          value={val}
          label={lab}
          onChange={handleChange}
        >
          {items.map((value) => {
            return (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

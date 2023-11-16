import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { TextField } from "@mui/material";
import DropDown from "../DropDown/DropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

import {
  BOULDER_GRADES,
  ROUTE_GRADES,
  STYLE,
  ANGLE,
} from "../../Utils/data-utils";

const WriteData = ({ onClick, onClose }) => {
  const supabase = createClient(
    "https://erwnauvxilsimrcmgxoq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd25hdXZ4aWxzaW1yY21neG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNjAyODEsImV4cCI6MjAwMjkzNjI4MX0.iwMKoZ_oyhROIPmnOXEanANOPgE77_pX7afTvNnFLEQ"
  );

  let current_date = () => {
    let yourDate = new Date();
    yourDate.toISOString().split("T")[0];
  };

  const [climbName, setClimbName] = useState("");
  const [climbGrade, setClimbGrade] = useState("");
  const [climbDate, setClimbDate] = useState(current_date());
  const [climbAscentType, setClimbAscentType] = useState("");
  const [climbAngle, setClimbAngle] = useState("");
  const [climbStyle, setClimbStyle] = useState("");

  async function writeData(
    climbDate,
    climbName,
    climbAscentType,
    climbGrade,
    climbAngle,
    climbStyle
  ) {
    const {
      data,
      error, // eslint-disable-line
    } = await supabase.from("all-data").insert([
      {
        date: climbDate,
        name: climbName,
        ascent_type: climbAscentType,
        grade: climbGrade,
        angle: climbAngle,
        style: climbStyle,
      },
    ]);

    console.log(error);
    return data;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    writeData(
      climbDate,
      climbName,
      climbAscentType,
      climbGrade,
      climbAngle,
      climbStyle
    );

    // should probably replace this with another call to read data...
    onClick({
      date: new Date(climbDate).toISOString().split("T")[0],
      name: climbName,
      ascent_type: climbAscentType,
      grade: climbGrade,
      angle: climbAngle,
      style: climbStyle,
    });

    // this can only be done if all the fields have first been validated
    onClose();
  };

  return (
    <div className="input-data-form">
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 300, margin: 1 }}>
          <FormControl fullWidth>
            <TextField
              id="climbName"
              label="Climb Name"
              value={climbName}
              onChange={function (e) {
                setClimbName(e.target.value);
              }}
            />
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 300, margin: 1 }}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DatePicker
                label="Date"
                defaultValue={climbDate}
                onChange={(newValue) => {
                  setClimbDate(newValue);
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>

        <DropDown
          id="climbGrade"
          items={[...ROUTE_GRADES, ...BOULDER_GRADES]}
          val={climbGrade}
          lab="Grade"
          handleChange={(e) => setClimbGrade(e.target.value)}
        />

        <DropDown
          id="climbAscentType"
          items={["Onsight", "Redpoint"]}
          lab="Ascent"
          val={climbAscentType}
          handleChange={(e) => setClimbAscentType(e.target.value)}
        />

        <DropDown
          id="climbAngle"
          items={ANGLE}
          lab="Angle"
          val={climbAngle}
          handleChange={(e) => setClimbAngle(e.target.value)}
        />

        <DropDown
          id="climbStyle"
          items={STYLE}
          lab="Style"
          val={climbStyle}
          handleChange={(e) => setClimbStyle(e.target.value)}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default WriteData;

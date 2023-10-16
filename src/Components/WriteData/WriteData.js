import { useState } from "react";
import useGradeList from "../GradePicker/GradePicker";
import { createClient } from "@supabase/supabase-js";

const WriteData = ({ onClick, onClose }) => {
  const supabase = createClient(
    "https://erwnauvxilsimrcmgxoq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyd25hdXZ4aWxzaW1yY21neG9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczNjAyODEsImV4cCI6MjAwMjkzNjI4MX0.iwMKoZ_oyhROIPmnOXEanANOPgE77_pX7afTvNnFLEQ"
  );

  const [climb, setClimb] = useState("Route"); // eslint-disable-line
  const [gradeList] = useGradeList(climb);

  const [climbName, setClimbName] = useState("");
  const [climbGrade, setClimbGrade] = useState(gradeList[0]);
  const [climbDate, setClimbDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [climbAscentType, setClimbAscentType] = useState("Repoint");
  const [climbAngle, setClimbAngle] = useState("All");
  const [climbStyle, setClimbStyle] = useState("All");

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
    onClick({
      date: climbDate,
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
        <label htmlFor="climbName">Name</label>
        <input
          id="climbName"
          value={climbName}
          type="text"
          onChange={(e) => setClimbName(e.target.value)}
        />

        {/* this is redundant */}
        <label htmlFor="climbGrade">Grade</label>
        <input
          id="climbGrade"
          value={climbGrade}
          type="text"
          onChange={(e) => setClimbGrade(e.target.value)}
        />

        {/* date picker */}
        <label htmlFor="climbDate">Date</label>
        <input
          id="climbDate"
          value={climbDate}
          type="text"
          onChange={(e) => setClimbDate(e.target.value)}
        />

        {/* Onsight or Redpoint */}
        <label htmlFor="climbAscentType">Ascent Type</label>
        <input
          id="climbAscentType"
          value={climbAscentType}
          type="text"
          onChange={(e) => setClimbAscentType(e.target.value)}
        />

        {/* Onsight or Redpoint */}
        <label htmlFor="climbAngle">Angle</label>
        <input
          id="climbAscentType"
          value={climbAngle}
          type="text"
          onChange={(e) => setClimbAngle(e.target.value)}
        />

        {/* Onsight or Redpoint */}
        <label htmlFor="climbStyle">Style</label>
        <input
          id="climbAscentType"
          value={climbStyle}
          type="text"
          onChange={(e) => setClimbStyle(e.target.value)}
        />

        {/* you can only submit if all sections are filled */}

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default WriteData;

import { React, useState, useEffect } from "react";

import {
  make_data,
  get_layers,
  STYLE,
  ANGLE,
  BOULDER_GRADES,
  ROUTE_GRADES,
} from "../../Utils/data-utils";
import Pyramid from "../Pyramid/Pyramid";
import "./SideBar.css";
import Fab from "../Fab/Fab";
import DropDown from "../DropDown/DropDown";
import { readData } from "../../Utils/readData";
import MultipleSelectChip from "../MultiSelect/MultiSelect";
import DiscreteSlider from "../Slider/Slider";

const SideBar = () => {
  const allYears = ["2020", "2021", "2022", "2023"];

  const [climb, setClimb] = useState("Route");
  const [selectedGrade, setSelectedGrade] = useState("5.13c");
  const [selectedLevel, setSelectedLevel] = useState(6);
  const [gradeList, setGradeList] = useState(ROUTE_GRADES);
  const [angle, setAngle] = useState(ANGLE);
  const [style, setStyle] = useState(STYLE);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [pyramid, setPyramid] = useState([]);
  const [years, setYears] = useState(allYears);

  useEffect(() => {
    async function fetchData() {
      try {
        const raw_dat = await readData();
        setAllData(raw_dat.data);
        setData(raw_dat.data);
      } catch (err) {
        setData([]);
      }
    }
    fetchData();
  }, []);

  // can we just read from the data base again?
  const appendData = (dat) => {
    setData(data.concat(dat));
  };

  useEffect(() => {
    console.log(data);
    setPyramid(
      make_data(data, get_layers(climb, selectedGrade, selectedLevel))
    );
  }, [data, climb, selectedGrade, selectedLevel]); // eslint-disable-line react-hooks/exhaustive-deps

  function changeTopGrade(e) {
    setSelectedGrade(e.target.value);
  }

  function changeLevels(e) {
    setSelectedLevel(parseInt(e.target.value));
  }

  function changeClimbStyle(e) {
    setClimb(e.target.value);
  }

  function changeAngle(e) {
    setAngle(e);
  }

  function changeYears(e) {
    setYears(e);
  }

  useEffect(() => {
    console.log(angle);
    setData(
      allData
        .filter((x) => angle.includes(x.angle))
        .filter((x) => style.includes(x.style))
        .filter((x) => years.includes(x.date.substring(0, 4)))
    ); // eslint-disable-next-line
  }, [angle, style, years]);

  function changeStyle(e) {
    setStyle(e);
  }

  useEffect(() => {
    if (climb === "Boulder") {
      setGradeList(BOULDER_GRADES);
      setSelectedGrade("v9");
    } else {
      setGradeList(ROUTE_GRADES);
      setSelectedGrade("5.13c");
    }
  }, [climb]);

  return (
    <div className="content">
      <div className="control-panel">
        <DropDown
          items={["Route", "Boulder"]}
          val={climb}
          lab="Climbing Style"
          handleChange={changeClimbStyle}
        />
        <DropDown
          items={gradeList}
          val={selectedGrade}
          lab="Top Grade"
          handleChange={changeTopGrade}
        />
        <DiscreteSlider
          defaultN={selectedLevel}
          step={1}
          min={1}
          max={20}
          lab={"Pyramid Levels"}
          clickEvt={changeLevels}
        />
        <MultipleSelectChip
          names={STYLE}
          lab={"Style"}
          setChange={changeStyle}
        />
        <MultipleSelectChip
          names={ANGLE}
          lab={"Angle"}
          setChange={changeAngle}
        />

        <MultipleSelectChip
          names={["2020", "2021", "2022", "2023"]}
          lab={"Year"}
          setChange={changeYears}
          color={["#CCF5F6", "#CBE4F9", "#D5CDEA", "#EEF9DA"]}
        />
      </div>

      <Pyramid pyramid={pyramid} />
      <Fab onClick={appendData} />
    </div>
  );
};

export default SideBar;

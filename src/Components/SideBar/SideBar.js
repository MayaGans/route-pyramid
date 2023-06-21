import { React, useState, useEffect } from "react";

import {
  make_pyramid,
  get_grades,
  get_totals,
  get_leftovers,
  STYLE,
  ANGLE,
} from "../../Utils/data-utils";
import useGradeList from "../GradePicker/GradePicker";
import Pyramid from "../Pyramid/Pyramid";
import "./SideBar.css";
import Fab from "../Fab/Fab";
import DateSelect from "../DateSelect/DateSelect";
import DropDown from "../DropDown/DropDown";
import RadioInput from "../RadioInput/RadioInput";
import { readData } from "../../Utils/readData";

const SideBar = () => {
  const date = new Date();

  const [climb, setClimb] = useState("Route");
  const [gradeList] = useGradeList(climb);
  const [selectedOption, setSelectedOption] = useState("5.13c");
  const [grade, setGrade] = useState(get_grades(selectedOption, gradeList));
  const [data, setData] = useState([]);

  // this should be Jan 1 of current year
  const [startDate, setStartDate] = useState(date.getFullYear() + "-01-01");
  const [endDate, setEndDate] = useState(date.toISOString().substring(0, 10));

  const [angle, setAngle] = useState("All");
  const [style, setStyle] = useState("All");
  const [pyramid, setPyramid] = useState([]);
  const [total, setTotal] = useState([]);
  const [leftover, setLeftover] = useState([]);

  const [l1, setL1] = useState(1);
  const [l2, setL2] = useState(2);
  const [l3, setL3] = useState(3);
  const [l4, setL4] = useState(6);
  const [l5, setL5] = useState(10);
  const [l6, setL6] = useState(12);

  console.log(readData());

  useEffect(() => {
    async function fetchData() {
      try {
        const raw_dat = await readData();
        console.log("RAW DATA");
        console.log(raw_dat.data);
        setData(raw_dat.data);
      } catch (err) {
        setData([]);
      }
    }
    fetchData();
  }, []);

  const appendData = (dat) => {
    setData(data.concat(dat));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    setPyramid(
      make_pyramid(
        selectedOption,
        data,
        gradeList,
        style,
        angle,
        startDate,
        endDate,
        [l1, l2, l3, l4, l5, l6]
      )
    );
  }, [
    selectedOption,
    data,
    style,
    angle,
    startDate,
    endDate,
    l1,
    l2,
    l3,
    l4,
    l5,
    l6,
    gradeList,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTotal(get_totals(data, grade, style, angle, startDate, endDate));
  }, [data, grade, style, angle, startDate, endDate]);

  useEffect(() => {
    setLeftover(get_leftovers(total, [l1, l2, l3, l4, l5, l6]));
  }, [total, l1, l2, l3, l4, l5, l6]);

  function changePyramid(e) {
    setSelectedOption(e.target.value);
    setGrade(get_grades(e.target.value, gradeList));
  }

  return (
    <div className="content">
      <div className="control-panel">
        <form>
          <RadioInput
            items={[
              { label: "Route", value: "Route" },
              { label: "Boulder", value: "Boulder" },
            ]}
            val={climb}
            checked={climb}
            lab="Style"
            clickEvt={(e) => {
              setClimb(e.target.value);
            }}
          />

          <DropDown
            items={gradeList.map((x) => {
              return { label: x, value: x };
            })}
            val={selectedOption}
            lab="Top Grade"
            clickEvt={changePyramid}
          />

          <DateSelect
            label="start-date"
            lab_text="Start Date"
            value={startDate}
            clickEvt={(e) => setStartDate(e.target.value)}
          />

          <DateSelect
            label="end-date"
            lab_text="End Date"
            value={endDate}
            min={startDate}
            clickEvt={(e) => setEndDate(e.target.value)}
          />

          <DropDown
            items={["All"].concat(STYLE).map((x) => {
              return { label: x, value: x };
            })}
            val={style}
            lab="Style"
            clickEvt={(e) => setStyle(e.target.value)}
          />

          <DropDown
            items={["All"].concat(ANGLE).map((x) => {
              return { label: x, value: x };
            })}
            val={angle}
            lab="Angle"
            clickEvt={(e) => setAngle(e.target.value)}
          />

          <div className="layer-input">
            <label htmlFor="layer-input">Block Numbers</label>
            <input
              className="layer-count layer-1"
              type="number"
              value={l1}
              onChange={(e) => setL1(+e.target.value)}
              min="1"
            />
            <input
              className="layer-count layer-2"
              type="number"
              value={l2}
              onChange={(e) => setL2(+e.target.value)}
              min="1"
            />
            <input
              className="layer-count layer-3"
              type="number"
              value={l3}
              onChange={(e) => setL3(+e.target.value)}
              min="1"
            />
            <input
              className="layer-count layer-4"
              type="number"
              value={l4}
              onChange={(e) => setL4(+e.target.value)}
              min="1"
            />
            <input
              className="layer-count layer-5"
              type="number"
              value={l5}
              onChange={(e) => setL5(+e.target.value)}
              min="1"
            />
            <input
              className="layer-count layer-6"
              type="number"
              value={l6}
              onChange={(e) => setL6(+e.target.value)}
              min="1"
            />
          </div>
        </form>
        <a href="https://github.com/MayaGans/route-pyramid/issues/56">
          File Issue
        </a>
      </div>

      <Pyramid
        grade={grade}
        pyramid={pyramid}
        total={total}
        leftover={leftover}
        count={[l1, l2, l3, l4, l5, l6]}
      />
      <Fab onClick={appendData} />
    </div>
  );
};

export default SideBar;

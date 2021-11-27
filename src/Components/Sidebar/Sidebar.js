import {React, useState, useEffect } from "react";
import { make_pyramid, get_grades, get_totals, get_leftovers, STYLE, ANGLE } from "../../Utils/data-utils";
import useGradeList from "../GradePicker/GradePicker"
import Pyramid from "../Pyramid/Pyramid"
import "./SideBar.css"
import Fab from "../Fab/Fab";

const SideBar = () => {

  let date = new Date()

  const [climb, setClimb] = useState('Route')
  const [gradeList] = useGradeList(climb)
  const [selectedOption, setSelectedOption] = useState("5.13c")
  const [grade, setGrade] = useState(get_grades(selectedOption, gradeList))
  const [data, setData] = useState([])
  
  // this should be Jan 1 of current year
  const [startDate, setStartDate] = useState(date.getFullYear() + "-01-01")
  const [endDate, setEndDate] = useState(date.toISOString().substring(0, 10))

  const [angle, setAngle] = useState("all")
  const [style, setStyle] = useState("all")
  const [pyramid, setPyramid] = useState([])
  const [total, setTotal] = useState([])
  const [leftover, setLeftover] = useState([])

  const [l1, setL1] = useState(1)
  const [l2, setL2] = useState(2)
  const [l3, setL3] = useState(3)
  const [l4, setL4] = useState(6)
  const [l5, setL5] = useState(10)
  const [l6, setL6] = useState(12)

  useEffect(() => {
    async function fetchData() {
      const url = `/.netlify/functions/fetch-routedata`;
      try {
        const raw_dat = await  fetch(url).then((res) => res.json())
        setData(raw_dat);
      } catch (err) {
        console.log(err);
        setData([]);
      } 
    }
    fetchData();
  }, []);

  const appendData = (dat) => {
    setData(data.concat(dat))
  }

  useEffect(() => {
    setPyramid(make_pyramid(
      selectedOption, 
      data, 
      gradeList, 
      style, 
      angle,
      startDate,
      endDate,
      [l1, l2, l3, l4, l5, l6]
     ))
  }, [selectedOption, data, style, angle, startDate, endDate, l1,l2,l3,l4,l5,l6]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTotal(get_totals(data, grade, style, angle, startDate, endDate))
  }, [data, grade, style, angle, startDate, endDate])

  useEffect(() => {
    setLeftover(get_leftovers(total, [l1,l2,l3,l4,l5,l6]))
  }, [total,l1,l2,l3,l4,l5,l6]) 

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value, gradeList))
  }

  return(
    <div className="content">
  
     <div className="control-panel">
     <form>
    
    <label htmlFor="climb">Style</label>
    <select
      defaultValue={climb}
      id="climb"
      name="climb"
      onChange={(e) => { setClimb(e.target.value)}}
      onBlur={(e) => { setClimb(e.target.value)}}
    >Climb
    <option value="Boulder">Boulder</option>
    <option value="Route">Route</option>
    <option></option> 
    </select>

    <label htmlFor="grades">Top Grade</label>
    <select 
      id="grades" 
      name="grades" 
      value={selectedOption}
      onBlur={changePyramid}
      onChange={changePyramid}
    >
    <option></option>
      {
        gradeList.map(grade => (
          <option value={grade} key={grade}>{grade}</option>
        ))
      }
    </select>

    <label htmlFor="start-date">Start Date</label>
    <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" id="start-date" name="start-date"></input>

    <label htmlFor="end-date">End Date</label>
    <input value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} type="date" id="end-date" name="end-date"></input>

    <label htmlFor="style">Style</label>
    <select 
      id="style" 
      name="style" 
      value={style}
      onBlur={(e) => setStyle(e.target.value)}
      onChange={(e) => setStyle(e.target.value)}
    >
    <option value="all">All</option>
      {
        STYLE.map(grade => (
          <option value={grade} key={grade}>{grade}</option>
        ))
      }
    </select>

    <label htmlFor="angle">Angle</label>
    <select 
      id="angle" 
      name="angle" 
      value={angle}
      onBlur={(e) => setAngle(e.target.value)}
      onChange={(e) => setAngle(e.target.value)}
    >
    <option value="all">All</option>
      {
        ANGLE.map(grade => (
          <option value={grade} key={grade}>{grade}</option>
        ))
      }
    </select>

    <div className="layer-input">
    <label htmlFor="layer-input">Block Numbers</label>
    <input className="layer-count layer-1" type="number" value={l1} onChange={(e) => setL1(+e.target.value)} min="1"/>
    <input className="layer-count layer-2" type="number" value={l2} onChange={(e) => setL2(+e.target.value)} min="1"/>
    <input className="layer-count layer-3" type="number" value={l3} onChange={(e) => setL3(+e.target.value)} min="1"/>
    <input className="layer-count layer-4" type="number" value={l4} onChange={(e) => setL4(+e.target.value)} min="1"/>
    <input className="layer-count layer-5" type="number" value={l5} onChange={(e) => setL5(+e.target.value)} min="1"/>
    <input className="layer-count layer-6" type="number" value={l6} onChange={(e) => setL6(+e.target.value)} min="1"/>
    </div>

    </form>
    </div>
  
    <Pyramid grade={grade} pyramid={pyramid} total={total} leftover={leftover} count={[l1,l2,l3,l4,l5,l6]}/>
    <Fab onClick={appendData}/>
    </div>
  );
}

export default SideBar;

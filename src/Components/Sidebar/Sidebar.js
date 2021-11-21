import {React, useState, useEffect } from "react";
import { make_pyramid, get_grades, get_totals, get_leftovers, STYLE, ANGLE } from "../../Utils/data-utils";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { process } from "./config"
import useGradeList from "../GradePicker/GradePicker"
import Pyramid from "../Pyramid/Pyramid"
import "./SideBar.css"

// Config variables
const SPREADSHEET_ID = process.spreadsheet_id
const CLIENT_EMAIL = process.client_email;
const PRIVATE_KEY = process.private_key;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const SideBar = () => {

  const [climb, setClimb] = useState('Route')
  const [gradeList] = useGradeList(climb)
  const [selectedOption, setSelectedOption] = useState("5.13c")
  const [grade, setGrade] = useState(get_grades(selectedOption, gradeList))
  const [data, setData] = useState([])
  
  // this should be Jan 1 of current year
  const [startDate, setStartDate] = useState([])
  // this should be set to today
  const [endDate, setEndDate] = useState([])

  const [angle, setAngle] = useState("all")
  const [style, setStyle] = useState("all")
  const [pyramid, setPyramid] = useState([])
  const [total, setTotal] = useState([])
  const [leftover, setLeftover] = useState([])

  useEffect(() => {
    requestData()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPyramid(make_pyramid(
      selectedOption, 
      data, 
      gradeList, 
      style, 
      angle, 
      // startDate, 
      // endDate
     ))
  }, [selectedOption, data, style, angle, startDate, endDate]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setTotal(get_totals(data, grade, style, angle))
  }, [data, grade, style, angle])

  useEffect(() => {
    setLeftover(get_leftovers(total))
  }, [total]) 
  

  // grab the data from google
  const requestData = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });

      // loads document properties and worksheets
      await doc.loadInfo();
  
      const sheet = doc.sheetsByIndex[1];
      const rows = await sheet.getRows();

      console.log(rows)

      setData(rows)
      setPyramid(make_pyramid(selectedOption, rows, gradeList, "all", "all"))
      setTotal(get_totals(rows, grade, "all", "all"))
      setLeftover(get_leftovers(get_totals(rows, grade, "all", "all")))
  
    } catch (e) {
      console.error('Error: ', e);
    }
  };

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
    <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" id="end-date" name="end-date"></input>

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

    </form>
    </div>
  
    <Pyramid grade={grade} pyramid={pyramid} total={total} leftover={leftover}/>
    </div>
  );
}

export default SideBar;

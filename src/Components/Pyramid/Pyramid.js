import {React, useState, useEffect } from "react";
import Layer from "../Layer/Layer";
import { make_pyramid, get_grades } from "../../Utils/data-utils";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { process } from "./config.js"
import useGradeList from "../GradePicker/GradePicker"

// Config variables
const SPREADSHEET_ID = process.spreadsheet_id
const CLIENT_EMAIL = process.client_email;
const PRIVATE_KEY = process.private_key;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const Pyramid = () => {
  
  const [selectedOption, setSelectedOption] = useState("5.13b")
  const [grade, setGrade] = useState(get_grades(selectedOption))
  const [data, setData] = useState([])

  // these are really needed 
  // once we make the gradelist conditional on 
  // boulder or routes
  // const [climb, setClimb] = useState('Route')
  const [gradeList] = useGradeList('Route')

  const [pyramid, setPyramid] = useState(make_pyramid(selectedOption, data, gradeList))

  // by making the array empty we're saying only grab the data once
  // but this should eventually be dependent on the submit button
  // in the form/write component... is that possible to pass state from that to here?
  useEffect(() => {
    requestData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // grab the data from google
  const requestData = async () => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });

      // loads document properties and worksheets
      await doc.loadInfo();
  
      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      setData(rows)
      setPyramid(make_pyramid(selectedOption, data))
  
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value))
    setPyramid(make_pyramid(selectedOption, data, gradeList))
  }

  return (
    <div>
  
    <label htmlFor="grades">Choose a Top Grade</label>

    {/*  
    this select is for Route or Boulder
    and will automatically change the gradeList select
    <select
      id="climb"
      name="climb"
      onChange={(e) => { setClimb(e.target.value)}}
      onBlur={(e) => { setClimb(e.target.value)}}
    >Climb
    <option value="Boulder">Boulder</option>
    <option value="Route" selected>Route</option>
    <option></option> 
    </select>

    */}
    <select 
      id="grades" 
      name="grades" 
      value={selectedOption}
      // why doesn't this work but onChange does? 
      onBlur={changePyramid} 
      onChange={changePyramid}
    > 
      {
        gradeList.map(grade => (
          <option value={grade} key={grade}>{grade}</option>
        ))
      }
    </select>

   {/* Everything above this should be in the sidebar component! */}

    <div className="pyramid">
      {
        grade.map((item, index) => (
          <Layer 
            grade={item} 
            key={item + "_" + index}
            name={pyramid.filter((x) => x.grade === item).map((d) => d.name)}
            date={pyramid.filter((x) => x.grade === item).map((d) => d.date)} />
        ))     
      }
    </div>
    </div>
  );
}

export default Pyramid;

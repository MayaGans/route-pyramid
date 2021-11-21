import {React, useState, useEffect } from "react";
import { make_pyramid, get_grades } from "../../Utils/data-utils";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { process } from "./config"
import useGradeList from "../GradePicker/GradePicker"
import Pyramid from "../Pyramid/Pyramid"

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
  const [pyramid, setPyramid] = useState(make_pyramid(selectedOption, data, gradeList))

  useEffect(() => {
    requestData()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPyramid(make_pyramid(selectedOption, data, gradeList))
  }, [selectedOption, data]) // eslint-disable-line react-hooks/exhaustive-deps

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
      setPyramid(make_pyramid(selectedOption, rows, gradeList))
  
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value, gradeList))
  }

  return(
    <div>
  
    <form>
    <label htmlFor="grades">Choose a Top Grade</label>

    <select
      defaultValue={climb}
      id="climb"
      name="climb"
      //onChange={(e) => { setClimb(e.target.value)}}
      onBlur={(e) => { setClimb(e.target.value)}}
    >Climb
    <option value="Boulder">Boulder</option>
    <option value="Route">Route</option>
    <option></option> 
    </select>

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
    </form>

    <Pyramid grade={grade} pyramid={pyramid}/>
    </div>
  );
}

export default SideBar;

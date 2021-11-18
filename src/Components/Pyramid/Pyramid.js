import {React, useState, useEffect } from "react";
import Layer from "../Layer/Layer";
import { make_pyramid, get_grades, CLIMBING_GRADES } from "../../Utils/data-utils";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { process } from "./config.js"

// Config variables
const SPREADSHEET_ID = process.spreadsheet_id
const CLIENT_EMAIL = process.client_email;
const PRIVATE_KEY = process.private_key;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const Pyramid = () => {
  
  const [selectedOption, setSelectedOption] = useState("5.13b")
  const [grade, setGrade] = useState(get_grades(selectedOption))
  const [data, setData] = useState([])
  const [pyramid, setPyramid] = useState(make_pyramid(selectedOption, data))

  // by making the array empty we're saying only grab the data once!
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
  
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value))
    setPyramid(make_pyramid(selectedOption, data))
  }

  return (
    <div>
  
    <label htmlFor="grades">Choose a Top Grade</label>
    <select 
      id="grades" 
      name="grades" 
      value={selectedOption}
      // why doesn't this work but onChange does? 
      onBlur={changePyramid} 
      onChange={changePyramid}> 
      {
        CLIMBING_GRADES.map(grade => (
          <option value={grade} key={grade}>{grade}</option>
        ))
      }
    </select>

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

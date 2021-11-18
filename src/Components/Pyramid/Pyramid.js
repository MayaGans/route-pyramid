import {React, useState } from "react";
import Layer from "../Layer/Layer";
import { raw_data } from "../../Utils/data"
import { make_pyramid, get_grades, CLIMBING_GRADES } from "../../Utils/data-utils";

const Pyramid = () => {

  const [grade, setGrade] = useState(get_grades("13B"))
  const [data, setData] = useState(make_pyramid(grade[0], raw_data))
  const [selectedOption, setSelectedOption] = useState("13B")

  /*
   we can use this to call from the google api
   and eventually we should store this in a database 
   and be able to upload new data 
   but that's too backend-y for now
  useEffect(() => {
    requestData()
    // this square bracket only runs the API once
    // if we left it blank it would run every render!
    // if we put something in the bracket
    // that will determine when it will call again
    // we can do this on the submission of a button
    // this is how we'll get data from google or whatever
  }, [])

  async function requestData() {
    const res = await fetch(
      `googlestring${textinput}`
    )

    const json = await res.json()
    setData(json.TODO)

  }
  */

  function changePyramid(e) {
    setSelectedOption(e.target.value)
    setGrade(get_grades(e.target.value))
    setData(make_pyramid(grade[0], raw_data))
  }

  return (
    <div>
  
    <label htmlFor="grades">Choose a Top Grade</label>
    <select 
      id="grades" 
      name="grades" 
      value={selectedOption}
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
            // I think this is causing the issue...
            key={item + "_" + index} 
            name={data.filter((x) => x.grade === item).map((d) => d.name)} />
        ))     
      }
    </div>
    </div>
  );
}

export default Pyramid;

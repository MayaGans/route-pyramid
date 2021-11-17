import {React, useState} from "react";
import Layer from "../Layer/Layer";
import { raw_data } from "../../Utils/data"
import { make_pyramid, get_grades, CLIMBING_GRADES } from "../../Utils/data-utils";

const Pyramid = () => {

  const [grade, setGrade] = useState(get_grades("13B"))
  const [data, setData] = useState(make_pyramid(grade[0], raw_data))
  const [selectedOption, setSelectedOption] = useState("13B")

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

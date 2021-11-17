import {React, useState} from "react";
import Layer from "../Layer/Layer";
import { raw_data } from "../../Utils/data"
import { make_pyramid, get_grades } from "../../Utils/data-utils";

const Pyramid = () => {

  /*
  A Hook without descructuring
  const gradeTouple = useState(get_grades("13B"))
  const grade = gradeTouple[0]
  const setGrade = gradeTouple[1]
  */

  const [grade, setGrade] = useState(get_grades("13B"))
  const [data, setData] = useState(make_pyramid(grade[0], raw_data))

  function changePyramid(e) {
    setGrade(get_grades(e.target.value))
    setData(make_pyramid(grade[0], raw_data))
  }

  let allLayers = grade.map((item, index) => (
    <Layer grade={item} key={item + "_" + index} name={data.filter((x) => x.grade === item).map((d) => d.name)} />
  ));

  return (
    <div>
  
    <label htmlFor="grades">Choose a Top Grade</label>
    <select id="grades" name="grades" onBlur={changePyramid}>
    <option value="14D">14D</option>
    <option value="14C">14C</option>
    <option value="14B">14B</option>
    <option value="14A">14A</option>
    <option value="13D">13D</option>
    <option value="13C">13C</option>
    <option value="13B" selected>13B</option>
    <option value="13A">13A</option>
    <option value="12D">12D</option>
    <option value="12C">12C</option>
    <option value="12B">12B</option>
    <option value="12A">12A</option>
    <option value="11D">11D</option>
    <option value="11C">11C</option>
    <option value="11B">11B</option>
    <option value="11A">11A</option>
    <option value="10D">11D</option>
    <option value="10C">10C</option>
    <option value="10B">10B</option>
    <option value="10A">10A</option>
    </select>

    <div className="pyramid">
      {allLayers}
    </div>
    </div>
  );
}

export default Pyramid;

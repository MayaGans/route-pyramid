import React from "react";
import Layer from "../Layer/Layer";
import { get_grades, data } from "../../Utils/data-utils";

// this is gonna be a state you can set
// so like the user will pick a grade from a dropdown
// and that will re-run this function
const grade = get_grades("13B");

// data will also eventually be a state you can upload/change
// maybe mock this up with two datasets we can toggle between
// just to start

class Pyramid extends React.Component {
  render() {
    return (
      <div class="pyramid">
        <Layer
          grade={grade[0]}
          name={data.filter((x) => x.grade === grade[0]).map((d) => d.name)}
        />
        <Layer
          grade={grade[1]}
          name={data.filter((x) => x.grade === grade[1]).map((d) => d.name)}
        />
        <Layer
          grade={grade[2]}
          name={data.filter((x) => x.grade === grade[2]).map((d) => d.name)}
        />
        <Layer
          grade={grade[3]}
          name={data.filter((x) => x.grade === grade[3]).map((d) => d.name)}
        />
        <Layer
          grade={grade[4]}
          name={data.filter((x) => x.grade === grade[4]).map((d) => d.name)}
        />
        <Layer
          grade={grade[5]}
          name={data.filter((x) => x.grade === grade[5]).map((d) => d.name)}
        />
      </div>
    );
  }
}

export default Pyramid;

import Layer from "../Layer/Layer"
import "./Pyramid.css"

const Pyramid = ({
  grade,
  pyramid,
  total,
  leftover,
  count
}) => {

  return (
    <div>
    <div className="pyramid">
    <h1 className="title">Route Pyramid</h1>
      {
        grade.map((item, index) => (
          <Layer 
            grade={item} 
            key={item + "_" + index}
            name={pyramid.filter((x) => x.grade === item).map((d) => d.name)}
            date={pyramid.filter((x) => x.grade === item).map((d) => d.date)} 
            ascent_type={pyramid.filter((x) => x.grade === item).map((d) => d.ascent_type)}
            total={total[index]}
            leftover={leftover[index]}
            count={count[index]}
            isLast={Array(count[index]-1).fill(false).concat(true)}/>
        ))     
      }
    </div>
    </div>
  );
}

export default Pyramid;

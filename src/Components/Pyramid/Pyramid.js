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
    <h1 className="centered">Route Pyramid</h1>
    <p className="centered">Powered By: 
      <a href="https://docs.google.com/spreadsheets/d/1rYfEg1G8pYv94n3p7slSaG9u03cWHwaL-6sTUysutVE/edit#gid=402597733">
        Jordan&apos;s Climbing Data
      </a>
      </p>
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

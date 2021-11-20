import Layer from "../Layer/Layer"

const Pyramid = ({
  grade,
  pyramid
}) => {

  return (
    <div className="pyramid">
      {
        grade.map((item, index) => (
          <Layer 
            grade={item} 
            key={item + "_" + index}
            name={pyramid.filter((x) => x.grade === item).map((d) => d.name)}
            date={pyramid.filter((x) => x.grade === item).map((d) => d.date)} 
            ascent_type={pyramid.filter((x) => x.grade === item).map((d) => d.ascent_type)}/>
        ))     
      }
    </div>
  );
}

export default Pyramid;

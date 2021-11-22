import Layer from "../Layer/Layer"

const Pyramid = ({
  grade,
  pyramid,
  total,
  leftover,
}) => {

  const count=[1,2,3,6,10,12]

  return (
    <div className="pyramid">
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
  );
}

export default Pyramid;

import Block from "../Block/Block";
import "./Layer.css"

const Layer = ({
  name,
  grade,
  date,
  total,
  leftover
}) => {

  return (
    <div className="layer">
      <Block 
        name={name} 
        grade={grade} 
        date={date}
        total={total}
        leftover={leftover}
      />
    </div>
  );
}

export default Layer;

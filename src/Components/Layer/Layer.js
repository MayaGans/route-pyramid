import Block from "../Block/Block";
import "./Layer.css"

const Layer = ({
  name,
  grade,
  date,
  total,
  leftover,
  isLast,
  count
}) => {

  return (
    <div className="layer">
      <Block 
        name={name} 
        grade={grade} 
        date={date}
        total={total}
        leftover={leftover}
        count={count}
        isLast={isLast}
      />
    </div>
  );
}

export default Layer;

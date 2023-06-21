import Block from "../Block/Block";
import "./Layer.css";

const Layer = ({
  name,
  grade,
  date,
  total,
  leftover,
  isLast,
  count,
  tries,
  ascent_type,
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
        tries={tries}
        ascent_type={ascent_type}
      />
    </div>
  );
};

export default Layer;

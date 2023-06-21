import Layer from "../Layer/Layer";
import "./Pyramid.css";

const Pyramid = ({ grade, pyramid, total, leftover, count }) => {
  return (
    <div>
      <h1 className="centered">Jordan&apos;s Route Pyramid</h1>
      <div className="legend">
        <div className="legend-item y2021">2021</div>
        <div className="legend-item y2022">2022</div>
        <div className="legend-item y2023">2023</div>
      </div>
      <div className="pyramid">
        {grade.map((item, index) => (
          <Layer
            grade={item}
            key={item + "_" + index}
            name={pyramid.filter((x) => x.grade === item).map((d) => d.name)}
            date={pyramid.filter((x) => x.grade === item).map((d) => d.date)}
            ascent_type={pyramid
              .filter((x) => x.grade === item)
              .map((d) => d.ascent_type)}
            total={total[index]}
            leftover={leftover[index]}
            count={count[index]}
            isLast={Array(count[index] - 1)
              .fill(false)
              .concat(true)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pyramid;

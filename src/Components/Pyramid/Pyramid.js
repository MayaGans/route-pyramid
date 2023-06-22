//import Layer from "../Layer/Layer";
import Layer from "../Layer/Layer";
import "./Pyramid.css";

const Pyramid = ({ pyramid }) => {
  let layers = Object.keys(pyramid);
  console.log(layers);
  return (
    <div>
      <h1 className="centered">Jordan&apos;s Route Pyramid</h1>
      <div className="legend">
        <div className="legend-item y2021">2021</div>
        <div className="legend-item y2022">2022</div>
        <div className="legend-item y2023">2023</div>
      </div>
      <div className="pyramid">
        {layers.map((x, i) => (
          <Layer
            current_layer={pyramid[x]}
            key={Object.keys(pyramid)[i]}
            grade={Object.keys(pyramid)[i]}
          ></Layer>
        ))}
      </div>
    </div>
  );
};

export default Pyramid;

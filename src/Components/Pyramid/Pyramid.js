//import Layer from "../Layer/Layer";
import Layer from "../Layer/Layer";
import "./Pyramid.css";

const Pyramid = ({ pyramid }) => {
  let layers = Object.keys(pyramid);
  return (
    <div className="pyramid">
      {layers.map((x, i) => (
        <Layer
          current_layer={pyramid[x]}
          key={Object.keys(pyramid)[i]}
          grade={Object.keys(pyramid)[i]}
        ></Layer>
      ))}
    </div>
  );
};

export default Pyramid;

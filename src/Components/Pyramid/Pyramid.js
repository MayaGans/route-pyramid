//import Layer from "../Layer/Layer";
import Layer from "../Layer/Layer";
import "./Pyramid.css";

const Pyramid = ({ pyramid }) => {
  let layers = Object.keys(pyramid);
  return (
    <div>
      <h1 className="centered">Jordan&apos;s Route Pyramid</h1>
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

import Block from "../Block/Block";
import "./Layer.css";

const Layer = ({ current_layer, grade }) => {
  return (
    <div className="layer">
      <div className="blocks">
        <div className="block no-border">{grade}</div>
        <div className="all-blocks">
          {current_layer.length >= 1 ? (
            current_layer.map((x) => (
              <Block
                name={x.name}
                date={x.date}
                ascent_type={x.ascent_type}
                key={x.name}
              ></Block>
            ))
          ) : (
            <Block name={""} date={""} ascent_type={""} key={"no_dat"}></Block>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layer;

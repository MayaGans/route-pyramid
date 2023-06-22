import "./Block.css";
import { BsCircleFill, BsLightningChargeFill } from "react-icons/bs";

const Block = ({ name, date, ascent_type }) => {
  let getIcon = (ascent_type) => {
    if (ascent_type == "Redpoint") {
      return <BsCircleFill size={10} fill={"tomato"} />;
    } else if (ascent_type == "Onsight") {
      return <BsLightningChargeFill size={14} />;
    } else {
      null;
    }
  };

  return (
    <div className={`block ${ascent_type} y${String(date).substring(0, 4)}`}>
      <strong>
        {name && (name.length > 20 ? name.substring(0, 20) + "..." : name)}
      </strong>
      <span className="block-date">{date}</span>
      <div className="icon-container">{getIcon(ascent_type)}</div>
    </div>
  );
};

export default Block;

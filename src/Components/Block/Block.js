import "./Block.css";
import { BsCircleFill, BsLightningChargeFill } from "react-icons/bs";

const Block = ({
  grade,
  name,
  leftover,
  date,
  isLast,
  ascent_type,
  //ascent_type, use for css
}) => {
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
    <div className="blocks">
      <div className="block no-border">{grade}</div>
      <div className="all-blocks">
        {name.map((item, index) => {
          return (
            <div
              className={`block ${ascent_type[index]} y${String(
                date[index]
              ).substring(0, 4)}`}
              key={item + index}
            >
              <strong>
                {item &&
                  (item.length > 20 ? item.substring(0, 20) + "..." : item)}
              </strong>
              <span className="block-date">{date[index]}</span>
              <div className="icon-container">
                {getIcon(ascent_type[index])}
              </div>
            </div>
          );
        })}
      </div>
      {isLast.map((item, index) => {
        if (item) {
          return (
            <div key={`${item}_${index}`} className="leftover">
              {leftover === 0 ? null : "+" + leftover}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Block;

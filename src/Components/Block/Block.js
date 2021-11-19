import './Block.css'

const Block = ({
  grade,
  name,
  // date
  // ascent_type -- use for css?
}) => {
  return (
    <div className="blocks">
      <div className="block no-border">{grade}</div>
      {
        name.map((item, index) => (
          <div className="block" key={item + index}>
            {item} 
            {/* <br/> {date[index]} */}
          </div>
        ))
      }
    </div>
  );
}

export default Block;

import './Block.css'

const Block = ({
  grade,
  name,
  // total
  leftover
  // date
  // ascent_type -- use for css?
}) => {

  // const counts = [0,2,3,6,10,14]

  return (
    <div className="blocks">
      <div className="block no-border">{grade}</div>
      {
        // after the last block we want to add the count of that layer
        name.map((item, index) => (
          <div className="block" key={item + index}>{item}</div>
        ))
      }
      <div className="block no-border leftover">{leftover === 0 ? null : "+" + leftover}</div>
    </div>
  );
}

export default Block;

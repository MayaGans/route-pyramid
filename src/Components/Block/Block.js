import './Block.css'

const Block = (props) => {
  return (
    <div className="blocks">
      <div className="block no-border">{props.grade}</div>
      {
        props.name.map((item, index) => (
          <div className="block" key={item + index}> {item}</div>
        ))
      }
    </div>
  );
}

export default Block;

import Block from "../Block/Block";

const Layer = (props) => {
  return (
    <div className="layer">
      <Block name={props.name} grade={props.grade} date={props.date}/>
    </div>
  );
}

export default Layer;

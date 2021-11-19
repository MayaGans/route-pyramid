import Block from "../Block/Block";

const Layer = ({
  name,
  grade,
  date
}) => {
  return (
    <div className="layer">
      <Block 
        name={name} 
        grade={grade} 
        date={date}
      />
    </div>
  );
}

export default Layer;

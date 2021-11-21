import './Block.css'

const Block = ({
  grade,
  name,
  // total
  leftover,
  // date
  // ascent_type -- use for css?
  isLast,
  count
}) => {

  return (
    <div className="blocks">
      <div className="block no-border">{grade}</div>
      {

        name.map((item, index) => {
            return(<div className='block' key={item + index}>{item}</div>)
        })

      }
      {
        name.map((item, index) => {
          if (isLast[index]) {
            return(
            <div key={index} className="additional-info">
            <div className="count">{count}</div>
            <div className="leftover">{leftover === 0 ? null : "+" + leftover}</div>
            </div>
            )
          }
        })
      }

    </div>
  );
}

export default Block;

import './Block.css'

const Block = ({
  grade,
  name,
  // total
  leftover,
  // date
  // ascent_type -- use for css?
  isLast
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
            console.log(item)
            return(
            <div key={index} className="additional-info">
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

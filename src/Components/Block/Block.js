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
        isLast.map((item, index) => {
          if (item) {
            return(
            <div key={`${item}_${index}`} className="leftover">{leftover === 0 ? null : "+" + leftover}</div>
            )
          }
        })
      }

    </div>
  );
}

export default Block;

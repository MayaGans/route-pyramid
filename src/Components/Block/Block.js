import './Block.css'

const Block = ({
  grade,
  name,
  leftover,
  date,
  isLast,
  //ascent_type, use for css
}) => {

  return (
    <div className="blocks">
      <div className="block no-border">{grade}</div>
      {

        name.map((item, index) => {
            return(<div className='block' key={item + index}>
              <strong>{item}</strong>
              <span className="block-date">{date[index]}</span>
              </div>
              )
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

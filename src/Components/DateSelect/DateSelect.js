import "./DateSelect.css"

const Date = ({label, lab_text, value, min, clickEvt}) => {
  return(
    <div className="form-group">
    <label htmlFor={label}>{lab_text}</label>
    <input id="climbName" value={value} onChange={clickEvt} type="date" min={min}/>
    </div>
  )
}

export default Date;
import React from "react";

const RadioInput = ({items, lab, clickEvt, checked}) => {

  return(
    <div className="form-group">
    <label lass="control-label" htmlFor={lab}>{lab}</label>
    <form>
      {items.map(({label, value}) => (
        <div key={label}>
        <input checked={checked === value ? 'checked' : ''} type="radio" value={value} id={value} onChange={clickEvt} name={lab} />
        <label htmlFor={label}>{value}</label>
        </div>
      ))}
    </form>
    </div>
  )
}

export default RadioInput;
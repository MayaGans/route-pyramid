import "./TextInput.css"

const TextInput = ({label, lab_text, value, clickEvt}) => {
  return(
    <div className="form-group">
    <label htmlFor={label}>{lab_text}</label>
    <input id="climbName" value={value} type="text" onChange={clickEvt}/>
    </div>
  )
}

export default TextInput;
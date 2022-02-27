import { useState } from 'react'
import DropDown from "../DropDown/DropDown"
import DateSelect from "../DateSelect/DateSelect"
import TextInput from "../TextInput/TextInput"
import useGradeList from "../GradePicker/GradePicker"
import {STYLE, ANGLE} from "../../Utils/data-utils"

const WriteData = ({onClick, onClose}) => {

  const [climbName, setClimbName] = useState([])
  const [climbGrade, setClimbGrade] = useState([])
  const [climbDate, setClimbDate] = useState(new Date().toISOString().substring(0, 10))
  const [climbAscentType, setClimbAscentType] = useState([])
  const [climbAngle, setClimbAngle] = useState([])
  const [climbStyle, setClimbStyle] = useState([])
  
  const [climb, setClimb] = useState('Route')
  const [gradeList] = useGradeList(climb)

  /*
  function log(data) {
    console.log('-----SUCCESS-----');
    console.log(data);
  }

  function error(err) {
    console.log('-----ERROR-----');
    console.error(err);
  }
  */

  async function writeData(climbDate,climbName,climbAscentType,climbGrade,climbAngle,climbStyle) {
    
    try {
    await fetch('/.netlify/functions/google-data', {
        method: 'POST',
        body: JSON.stringify({
          date: climbDate,
          name: climbName,
          ascent_type: climbAscentType,
          grade: climbGrade,
          location: null,
          country: null,
          attempts: null,
          angle: climbAngle,
          style: climbStyle
        })
      })
        .then((res) => res.json())
        /*
        .then(log)
        .catch(error);
        */
      
    } catch (err) {
      console.log(err);
    } 
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    writeData(climbDate,climbName,climbAscentType,climbGrade,climbAngle,climbStyle)
    onClick({
      date: climbDate,
      name: climbName,
      ascent_type: climbAscentType,
      grade: climbGrade,
      location: null,
      country: null,
      attempts: null,
      angle: climbAngle,
      style: climbStyle
    })
    // this can only be done if all the fields have first been validated
    onClose()
}

  return (
    <div className="input-data-form">
    <form onSubmit={handleSubmit}>

      { 
      /*
        These should really all be their own components I think? 
        Or is that extra?

        Specifically we use a different version 
        of the grade dropdown in pyramid which is redundant
      */
      }
      

      <TextInput 
        label= "climbName"
        lab_text="Name"
        value={climbName}
        clickEvt={e => setClimbName(e.target.value)}
      />

      <DropDown 
         items={[{label: "Route", value: "Route"},{label:"Boulder", value: "Boulder"}]}
         val={climb}
         lab="Style"
         clickEvt={(e) => { setClimb(e.target.value)}}
      />
      
      <DropDown 
         items={gradeList.map(x => { return {label: x, value: x}})}
         val={climbGrade}
         lab="Top Grade"
         clickEvt={(e) => setClimbGrade(e.target.value)}
      />
      
      <DateSelect
         label="climbData"
         lab_text="Date"
         value={climbDate}
         clickEvt={(e) => setClimbDate(e.target.value)}
      />

      <DropDown 
         items={[{label: "Redpoint", value: "Redpoint"},{label:"Onsight", value: "Onsight"}]}
         val={climbAscentType}
         lab="Ascent Type"
         clickEvt={(e) => setClimbAscentType(e.target.value)}
      />
      
      <DropDown 
         items={["All"].concat(STYLE).map(x => { return {label: x, value: x}})}
         val={climbStyle}
         lab="Style"
         clickEvt={(e) => setClimbStyle(e.target.value)}
      />
     
     <DropDown 
         items={["All"].concat(ANGLE).map(x => { return {label: x, value: x}})}
         val={climbAngle}
         lab="Angle"
         clickEvt={(e) => setClimbAngle(e.target.value)}
     />

      { /* you can only submit if all sections are filled */}
      <input type="submit" value="Submit" />
    </form>
    </div>
  );

}

export default WriteData;
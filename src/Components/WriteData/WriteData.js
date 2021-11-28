import { useState } from 'react'

const WriteData = ({onClick, onClose}) => {

  const [climbName, setClimbName] = useState([])
  const [climbGrade, setClimbGrade] = useState([])
  const [climbDate, setClimbDate] = useState([])
  const [climbAscentType, setClimbAscentType] = useState([])
  const [climbAngle, setClimbAngle] = useState([])
  const [climbStyle, setClimbStyle] = useState([])

  function log(data) {
    console.log('-----SUCCESS-----');
    console.log(data);
  }

  function error(err) {
    console.log('-----ERROR-----');
    console.error(err);
  }

  async function writeData(climbDate,climbName,climbAscentType,climbGrade,climbAngle,climbStyle) {
    
    try {
    await fetch('/.netlify/functions/fetch-writedata', {
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
        .then(log)
        .catch(error);
      
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
      
      { /* free form text */}
      <label htmlFor="climbName">Name</label>
      <input id="climbName" value={climbName} type="text" onChange={e => setClimbName(e.target.value)}/>

      { /* this is redundant */}
      <label htmlFor="climbGrade">Grade</label>
      <input id="climbGrade" value={climbGrade} type="text" onChange={(e) => setClimbGrade(e.target.value)}/>

      { /* date picker */}
      <label htmlFor="climbDate">Date</label>
      <input id="climbDate" value={climbDate} type="text" onChange={(e) => setClimbDate(e.target.value)}/>

      { /* Onsight or Redpoint */}
      <label htmlFor="climbAscentType">Ascent Type</label>
      <input id="climbAscentType" value={climbAscentType} type="text" onChange={(e) => setClimbAscentType(e.target.value)}/>
      
      { /* Onsight or Redpoint */}
      <label htmlFor="climbAngle">Angle</label>
      <input id="climbAscentType" value={climbAngle} type="text" onChange={(e) => setClimbAngle(e.target.value)}/>

      { /* Onsight or Redpoint */}
      <label htmlFor="climbStyle">Style</label>
      <input id="climbAscentType" value={climbStyle} type="text" onChange={(e) => setClimbStyle(e.target.value)}/>

      { /* you can only submit if all sections are filled */}
      <input type="submit" value="Submit" />
    </form>
    </div>
  );

}

export default WriteData;

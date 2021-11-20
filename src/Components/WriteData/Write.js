import { GoogleSpreadsheet } from "google-spreadsheet";
import { useState } from 'react'
import { process } from '../Pyramid/config'

// Config variables
const SPREADSHEET_ID = process.spreadsheet_id
const CLIENT_EMAIL = process.client_email;
const PRIVATE_KEY = process.private_key;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const Write = () => {

  const [climbName, setClimbName] = useState([])
  const [climbGrade, setClimbGrade] = useState([])
  const [climbDate, setClimbDate] = useState([])
  const [climbAscentType, setClimbAscentType] = useState([])

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();
  
      const sheet = doc.sheetsByIndex[0];
      const result = await sheet.addRow(row); // eslint-disable-line no-unused-vars

    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    appendSpreadsheet(
      {
      date: climbDate,
      name: climbName,
      ascent_type: climbAscentType,
      grade: climbGrade,
      location: null,
      country: null,
      attempts: null
      }
    )
}

  return (
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
      
      { /* you can only submit if all sections are filled */}
      <input type="submit" value="Submit" />
    </form>
  );

}

export default Write;

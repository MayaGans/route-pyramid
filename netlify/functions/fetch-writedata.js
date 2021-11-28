if (!process.env.NETLIFY) {
  // get local env vars if not in CI
  // if in CI i expect its already set via the Netlify UI
  require('dotenv').config();
}

// required env vars
if (!process.env.CLIENT_EMAIL)
  throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set');
if (!process.env.PRIVATE_KEY)
  throw new Error('no GOOGLE_PRIVATE_KEY env var set');
if (!process.env.SPREADSHEET_ID)
  // spreadsheet key is the long id in the sheets URL
  throw new Error('no GOOGLE_SPREADSHEET_ID_FROM_URL env var set');

const { GoogleSpreadsheet } = require("google-spreadsheet");

exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  
  const row = JSON.parse(event.body);
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

  try {

    await doc.useServiceAccountAuth({
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY,
    });

    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[1];
    const result = await sheet.addRow(row); // eslint-disable-line no-unused-vars

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `POST Success - added row ${row._rowNumber - 1}`,
        rowNumber: row._rowNumber - 1 // minus the header row
      })
    };

  } catch (err) {
    console.error('error ocurred in processing ', event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString()
    };
  }

};
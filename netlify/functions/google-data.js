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

exports.handler = async function (event) {
  //console.log(event.httpMethod);
  //console.log(context);

  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL, 
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  });

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[1];

  try {
    switch(event.httpMethod) {
      case 'GET': {
        const rows = await sheet.getRows();
        const serializedRows = rows.map(serializeRow);
        return {
          statusCode: 200,
          body: JSON.stringify(serializedRows)
        }
      }
      case 'POST': {
        const data = JSON.parse(event.body);
        const result = await sheet.addRow(data);
        console.log(result)
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `POST Success - added row ${result._rowNumber - 1}`,
            rowNumber: result._rowNumber - 1 // minus the header row
          })
        };
      }
      default: {
        return {
          statusCode: 500,
          body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE'
        };
      }
    }
  } catch (err) {
    console.error('error ocurred in processing ', event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString()
    };
  }

  function serializeRow(row) {
    let temp = {};
    sheet.headerValues.map((header) => {
      temp[header] = row[header];
    });
    return temp;
  }

};

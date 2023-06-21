const { GoogleSpreadsheet } = require("google-spreadsheet");

// required env vars
if (!process.env.CLIENT_EMAIL)
  throw new Error("no GOOGLE_SERVICE_ACCOUNT_EMAIL");
if (!process.env.PRIVATE_KEY) throw new Error("no GOOGLE_PRIVATE_KEY");
if (!process.env.SPREADSHEET_ID)
  throw new Error("no GOOGLE_SPREADSHEET_ID_FROM_URL");

exports.handler = async function (event, context) {
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

  // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];
  const rows = await sheet.getRows();
  const serializedRows = rows.map(serializeRow);

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(serializedRows),
    };
  } catch (err) {
    console.error("error ocurred in processing ", event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString(),
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

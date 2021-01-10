const axios = require('axios'); // Axios module
require('dotenv').config(); // Enabling to load Environment variables from a .env File
const sha512 = require('js-sha512'); // component to compute the SHA512

exports.handler = function (event, context, callback) {
  const urlPath = event.path;
  const postCode = urlPath.substr(urlPath.lastIndexOf('/') + 1);
  console.log(postCode);

  const API_KEY = '76=more=bank=YARD=19';
  const HASH = sha512('/leasedline/address_results/' + postCode + API_KEY);
  const URL =
    `https://api.interdns.co.uk/leasedline/address_results/` + postCode;

  // Send user response
  const headers = {
    User: 'icukapi',
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };

  const sendResponse = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  };

  // Perform API call
  const district_id = () => {
    axios
      .get(URL, { headers: headers })
      .then((res) => {
        // console.log(res);
        sendResponse(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        sendResponse(err);
      });
  };

  // Make sure method is GET
  if (event.httpMethod == 'GET') {
    district_id();
  }
};

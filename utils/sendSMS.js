var request = require('request');
const connection = require("../dbConnect");
const { GET_PHONE_NUMBER_BY_ADP_ID } = require('../adp/adpQuery/adp/adp');
const sendSMS = (phone, message) => {
    request(`http://enterprise.smsgupshup.com/GatewayAPI/rest?msg=${message}&v=1.1&userid=2000157538&password=aaYABxonF&send_to=${phone}&msg_type=text&method=sendMessage`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body); // Print the google web page.
      }
    });
}

const sendSmsByAdpId = (adpId, message) => {
  connection.query(GET_PHONE_NUMBER_BY_ADP_ID(adpId), async (error, results, fields) => {
    let phoneNumber = results[0].mobile;
    if (phoneNumber) {
      request(`http://enterprise.smsgupshup.com/GatewayAPI/rest?msg=${message}&v=1.1&userid=2000157538&password=aaYABxonF&send_to=${phoneNumber}&msg_type=text&method=sendMessage`, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body); // Print the google web page.
        }
      });
    }
    
  })
  
}
// sendSMS();

module.exports.sendSMS = sendSMS;
module.exports.sendSmsByAdpId = sendSmsByAdpId;

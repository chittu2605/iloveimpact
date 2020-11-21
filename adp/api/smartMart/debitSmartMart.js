const connection = require("../../../dbConnect");
const { sendSmsByAdpId } = require("../../../utils/sendSMS");
const { DEBIT_FROM_SMART_MART_BALANCE, GET_SMART_MART_BALANCE, CREDIT_SMART_MART_BALANCE, INSERT_SMART_MART_BALANCE_STATEMENT } = require("../../adpQuery/smartMart/smartMart");

const debitSmartMart = (adp_id, amount) => {
  connection.query(DEBIT_FROM_SMART_MART_BALANCE(adp_id, amount), async (error, results, fields) => {
    console.log(DEBIT_FROM_SMART_MART_BALANCE(adp_id, amount))
    console.log(error)
    if (error) return false
    connection.query(GET_SMART_MART_BALANCE(adp_id), async (error, results, fields) => {
      let balance = results[0].balance;
      let msg =  `Your smart mart balance has been debited with ${amount} Rs. Your net balance now is ${balance} Rs. `;
      let debit = amount;
      let credit = 0;
      connection.query(INSERT_SMART_MART_BALANCE_STATEMENT(adp_id, msg, credit, debit), async (error, results, fields) => {
        if (error) return error
        sendSmsByAdpId(adp_id, msg)
        return balance
      })
    })
      
    
  })
}

const creditSmartMart = (adp_id, amount) => {
  connection.query(CREDIT_SMART_MART_BALANCE(adp_id, amount), async (error, results, fields) => {
    console.log(CREDIT_SMART_MART_BALANCE(adp_id, amount))
    console.log(error)
    if (error) return false
    connection.query(GET_SMART_MART_BALANCE(adp_id), async (error, results, fields) => {
      let balance = results[0].balance;
      let msg =  `Your smart mart balance has been credited with ${amount} Rs. Your net balance now is ${balance} Rs. `;
      let debit = 0;
      let credit = amount;
      connection.query(INSERT_SMART_MART_BALANCE_STATEMENT(adp_id, msg, credit, debit), async (error, results, fields) => {
        if (error) return error
        sendSmsByAdpId(adp_id, msg)
        return balance
      })
    })
      
    
  })
}

module.exports.debitSmartMart = debitSmartMart;
module.exports.creditSmartMart = creditSmartMart;
const connection = require("../../../dbConnect");
const { DEBIT_FROM_WALLET, INSERT_WALLET_STATEMENT, GET_WALLET } = require("../../adpQuery/wallet/wallet");
const { sendSmsByAdpId } = require("../../../utils/sendSMS");

const debitWallet = (adp_id, amount) => {
  connection.query(DEBIT_FROM_WALLET(adp_id, amount), async (error, results, fields) => {
    console.log(DEBIT_FROM_WALLET(adp_id, amount))
    if (error) return false
    connection.query(GET_WALLET(adp_id), async (error, results, fields) => {
      let balance = results[0].balance;
      let msg =  `Your wallet has been debited with ${amount} Rs. Your net balance now is ${balance} Rs. `;
      let debit = amount;
      let credit = 0;
      connection.query(INSERT_WALLET_STATEMENT(adp_id, msg, credit, debit), async (error, results, fields) => {
        if (error) return error
        sendSmsByAdpId(adp_id, msg)
        return balance
      })
    })
      
    
  })
}

module.exports.debitWallet = debitWallet;
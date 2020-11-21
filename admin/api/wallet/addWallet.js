const { sendSmsByAdpId } = require("../../../utils/sendSMS");



module.exports = (app) => {
  const { GET_WALLET_BALANCE, ADD_WALLET_BALANCE, CREATE_WALLET, INSERT_WALLET_STATEMENT } = require("../../dbQuery/wallet/walletQuery");
  const connection = require("../../../dbConnect");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.post("/add-wallet-balance", urlencodedParser, async (req, res) => {
      let adpId = req.body.adpId;
      let amount = req.body.balance;
      connection.query(GET_WALLET_BALANCE(adpId), async (error, walletResult, fields) => {
          if (error) return res.sendStatus("401");
          // if (results.length === 0) return res.sendStatus("404");
          if ( walletResult && walletResult.length > 0 ) {
            connection.query(ADD_WALLET_BALANCE(adpId, amount), async (error, results, fields) => {
              let message = `Your wallet is credited by Rs${amount}.`;
              

              connection.query(GET_WALLET_BALANCE(adpId), async (error, results, fields) => {
                let balance = results[0].balance;
                let msg =  `Your wallet has been credited with ${amount} Rs. Your net balance now is ${balance} Rs. `;
                let debit = 0;
                let credit = amount;
                connection.query(INSERT_WALLET_STATEMENT(adpId, msg, credit, debit), async (error, results, fields) => {
                  if (error) return error
                  sendSmsByAdpId(adpId, msg)
                  return balance
                })
              })


              sendSmsByAdpId(adpId, message)
              return res.json({
                status: "success"
              });
            })
          } else {
            connection.query(CREATE_WALLET(adpId, amount), async (error, results, fields) => {
              let message = `Your wallet is credited by Rs${amount}.`;
              sendSmsByAdpId(adpId, message)
              return res.json({
                status: "success"
              });
            })
          }
 
      })

  })

 



  
  
} 


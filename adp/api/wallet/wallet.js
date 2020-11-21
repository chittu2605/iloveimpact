

module.exports = (app) => {
    const { GET_WALLET, CREATE_WALLET, GET_WALLET_STATEMENT } = require("../../adpQuery/wallet/wallet");
    const connection = require("../../../dbConnect");
    const jwt = require("jsonwebtoken");
    const bodyParser = require('body-parser')
    const urlencodedParser = bodyParser.urlencoded({ extended: false })
  
    app.get("/adp/wallet", urlencodedParser, async (req, res) => {
      const adpId = req.user.adp_id;
        
      connection.query(GET_WALLET(adpId), async (error, results, fields) => {
        if (error) return res.sendStatus("401");
        if (results.length === 0) {
          connection.query(CREATE_WALLET(adpId), async (error, results, fields) => {
            if (error) return res.sendStatus("401");
            res.json({
              status: "success",
              balance: 0,
            });
          })
        } else {
          connection.query(GET_WALLET_STATEMENT(adpId), async (error, statement, fields) => {
            if (error) return res.sendStatus("401");
            res.json({
              status: "success",
              balance: results[0].balance,
              statement: statement,
            });
          })
          
        }
      })
  
    })
  }  
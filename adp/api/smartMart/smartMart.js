
module.exports = (app) => {
  const { GET_SMART_MART_BALANCE, CREATE_SMART_MART_BALANCE, GET_SMART_MART_BALANCE_STATEMENT } = require("../../adpQuery/smartMart/smartMart");
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.get("/adp/smart-mart-balance", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
      
    connection.query(GET_SMART_MART_BALANCE(adpId), async (error, results, fields) => {
      if (error) return res.sendStatus("401");
      if (results.length === 0) {
        connection.query(CREATE_SMART_MART_BALANCE(adpId), async (error, results, fields) => {
          if (error) return res.sendStatus("401");
          res.json({
            status: "success",
            balance: 0,
          });
        })
      } else {
        connection.query(GET_SMART_MART_BALANCE_STATEMENT(adpId), async (error, statement, fields) => {
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
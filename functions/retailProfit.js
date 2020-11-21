const { GET_RETAIL_PROFIT } = require("./query");
const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const getRetailProfit = (adpId) => {
  return new Promise((resolve, reject) => {
    connection.query(GET_RETAIL_PROFIT(adpId), async (error, results, fields) => {
      let retailProfit = 0;
      retailProfit = ( results && results.length > 0 ) ? (results[0].total_retail_profit + retailProfit) : retailProfit
      resolve(retailProfit);
    })
  })
}


module.exports = (app) => {


  app.get("/adp/retail-profit", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;

    getRetailProfit(adpId).then((result) => {
      res.json({
        status: "success",
        total_retail_profit: result
      });
    })
  })


}  

module.exports.getRetailProfit = getRetailProfit;
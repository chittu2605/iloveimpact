const { generateStatement } = require("../../../functions/generateStatement");

module.exports = (app) => {
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })

  app.get("/generate-statement", urlencodedParser, async (req, res) => {
    const adpId = req.query.adpId;
    console.log(adpId)
    generateStatement(adpId).then((result) => {
      return res.json({
        result
      });
    })

  })


}
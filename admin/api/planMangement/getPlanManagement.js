

module.exports = (app) => {
  const { SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT, SELECT_ALL_PLAN_MANAGEMENT } = require("../../dbQuery/planManagement/planManagement");
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })


  app.get("/bv-weightage", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
      
    connection.query(SELECT_BV_WEIGHTAGE_PLAN_MANAGEMENT(), async (error, results, fields) => {
      if (error) return res.sendStatus("401");
      res.json({
        status: "success",
        results
      });
    })

  })


  app.get("/all-plan-management", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
      
    connection.query(SELECT_ALL_PLAN_MANAGEMENT(), async (error, results, fields) => {
      if (error) return res.sendStatus("401");
      res.json({
        status: "success",
        results
      });
    })

  })
}  


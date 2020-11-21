

module.exports = (app) => {
  const { UPDATE_PLAN_BY_ID } = require("../../dbQuery/planManagement/planManagement");
  const connection = require("../../../dbConnect");
  const jwt = require("jsonwebtoken");
  const bodyParser = require('body-parser')
  const urlencodedParser = bodyParser.urlencoded({ extended: false })


  app.post("/update-plan", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    const plan = req.body.plan;
      
    connection.query(UPDATE_PLAN_BY_ID(plan), async (error, results, fields) => {
      if (error) return res.sendStatus("401");
      res.json({
        status: "success",
      });
    })

  })

}  


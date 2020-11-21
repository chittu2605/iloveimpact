const { GET_ADP_BY_CO_SPONSOR } = require("../admin/dbQuery/adp/adpQuery");
const getPbv = require("./getPbv");
const { GET_CO_SPONSOR_INCOME, GET_ALL_ADP_PBV_BY_CO_SPONSOR, GET_CO_SPONSOR_PLAN_VALUE } = require("./query");
const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


getCoSponsorTotalPbv = (adpId) => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_ALL_ADP_PBV_BY_CO_SPONSOR(adpId), async (error, totalPbv, fields) => {
      resolve(totalPbv)
    })
  })
}

getCoSponsorIncome = (adpId) => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_CO_SPONSOR_PLAN_VALUE(adpId), async (error, coSponsorPlan, fields) => {
      
      getCoSponsorTotalPbv(adpId).then((result) => {
        let totalPbv = result[0] ? result[0].totalPbv : 0;
        let coSponsorPlanValue = coSponsorPlan[0] ? coSponsorPlan[0].value : 0;
        let cosponsorIncome = totalPbv*coSponsorPlanValue/100;
        resolve(cosponsorIncome)
      })
    })
  })
  
}

module.exports = (app) => {
  app.get("/adp/co-sponsor-income", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getCoSponsorIncome(adpId).then((result) => {
      res.json({
        status: "success",
        co_sponsor_income: result,
      });
    })

  })

}  


module.exports.getCoSponsorIncome = getCoSponsorIncome;
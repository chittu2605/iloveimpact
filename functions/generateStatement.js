const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const { GET_ADP_NAME_AND_SPONSOR_ID, GET_PLAN_TDS } = require("./query");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const moment = require("moment");
const { getRetailProfit } = require("./retailProfit");
const { getCoSponsorIncome } = require("./coSponsorIncome");
const { generatePzi } = require("./generatePzi");

const getAdpInfo = (adp_id) => {
  return new Promise((resolve, reject) => {
    connection.query(GET_ADP_NAME_AND_SPONSOR_ID(adp_id), async (error, adpInfo, fields) => {
      resolve(adpInfo);
    })
  })
}

const getTds = () => {
  return new Promise((resolve, reject) => {
    connection.query(GET_PLAN_TDS(), async (error, tdsInfo, fields) => {
      resolve(tdsInfo);
    })
  })
}

const generateStatement = (adpId) => {
  return new Promise((resolve, reject) => {
    let statement = {
      adp_id: "", 
      adp_name: "", 
      sponsor_id: "", 
      pan_card: "", 
      mobile: "", 
      cycle_date: "", 
      retail_profit: 0, 
      co_sponsor_royality: 0, 
      champion_club: 0, 
      leader_club: 0, 
      one_plus_one_club: 0, 
      super_income_club: 0, 
      meb_club: 0, 
      pull: 0, 
      total: 0, 
      pzi_income: 0, 
      net_commission: 0, 
      pull_fund: 0, 
      pool_fund: 0, 
      tds: 0, 
      tds_cut: 0, 
      commission_paid: 0, 
      final_paid: 0,
    };

    getAdpInfo(adpId).then(async (adpInfo) => {
      console.log(adpInfo)
      if ( adpInfo && adpInfo.length > 0) {
        adpInfo = adpInfo[0]
        statement.adp_id = adpInfo.adp_id;
        statement.adp_name = `${adpInfo.firstname} ${adpInfo.lastname}`;
        statement.sponsor_id = adpInfo.sponsor_id;
        statement.pan_card = adpInfo.pan;
        statement.mobile = adpInfo.mobile;
        statement.cycle_date = moment().format("D/MM/YYYY hh:mm:ssa");

        let retailProfit = await getRetailProfit(adpId).then((retailProfit) => {
          statement.retail_profit = retailProfit;
        })

        let coSponsorIncome = await getCoSponsorIncome(adpId).then((coSponsorIncome) => {
          statement.co_sponsor_royality = coSponsorIncome;
        })

        let pzi = await generatePzi(adpId).then((pzi) => {
          statement.pzi_income = pzi;
        })
        

        statement.total = statement.retail_profit + statement.co_sponsor_royality + statement.champion_club + statement.leader_club + statement.one_plus_one_club + statement.super_income_club + statement.meb_club + statement.pull;
        statement.net_commission = statement.total + statement.pzi_income;

        statement.final_paid = statement.net_commission + statement.pull_fund + statement.pool_fund;

        let tds = await getTds(adpId).then((tdsData) => {
          let tds = tdsData[0].value;
          statement.tds = tds;

          let tdsDeductValue = (statement.final_paid * tds/100);
          let commissionPaid = statement.final_paid - tdsDeductValue;

          statement.tds_cut = tdsDeductValue;
          statement.commission_paid = commissionPaid;
        })
        // console.log(statement)
        resolve(statement)
      } else {
        resolve(statement)
      }
      
    })

  })
}

// generateStatement(11901084)


module.exports.generateStatement = generateStatement;



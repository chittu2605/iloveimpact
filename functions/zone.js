const { GET_PLAN_ZONE } = require("./query");
const connection = require("../dbConnect");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { getAdpPbv, getAdpBv } = require("./getPbv");

const getPlanZone = () => {
  return new Promise(async (resolve, reject) => {
    connection.query(GET_PLAN_ZONE(), async (error, results, fields) => {
      resolve(results)
    })
  })
}



const getAdpZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then((allZone) => {
        let zone = allZone.filter((elm) => {
          if (bvData.bvTillDate == 0 && elm.min_value == 1) {
            resolve(elm)
          } else if (bvData.bvTillDate >= elm.min_value && (bvData.bvTillDate <=  elm.max_value || elm.max_value == 0)) {
            resolve(elm)
          }
        })
      })  
    })
      
  })
}


const getDeficitZone = (adpId) => {
  return new Promise(async (resolve, reject) => {
    getAdpBv(adpId).then((bvData) => {
      getPlanZone().then((allZone) => {
        let zone = allZone.filter((elm, i) => {
          if (bvData.bvTillDate >= elm.min_value && bvData.bvTillDate <=  elm.max_value) {
            let deficitZone = allZone[i + 1].name;
            let deficitValue = allZone[i + 1].min_value - bvData.bvTillDate;
            resolve({deficitZone, deficitValue})
          }
          else if (bvData.bvTillDate >= elm.min_value && elm.max_value == 0) {
            resolve({deficitZone: false})
          }
        })
      })  
    })
      
  })
}


module.exports = (app) => {



  // getAdpZone(90395932).then((result) => {
  //   console.log(result)
  // })

  app.get("/adp/zone", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getAdpZone(adpId).then((result) => {
      res.json({
        ...result
      });
    })

  })

  app.get("/adp/all-zone", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getPlanZone(adpId).then((result) => {
      res.json({
        ...result
      });
    })

  })

  app.get("/adp/deficit-zone", urlencodedParser, async (req, res) => {
    const adpId = req.user.adp_id;
    getDeficitZone(adpId).then((result) => {
      res.json({
        ...result
      });
    })

  })

  

  
}

module.exports.getAdpZone = getAdpZone;